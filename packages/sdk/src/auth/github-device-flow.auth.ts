/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import browserifyEvents from 'browserify-events'
import { Client } from '../client.js'
import { GitHubConfig } from '../configs/github.config.js'
import { GitHubDeviceFlowAuthStage } from '../enums/github-device-flow-auth-stage.enum.js'
import { POST } from '../helpers/request.helper.js'
import type { HttpClient } from '../http-client.js'
import type { GitHubRequestAccessTokenResDto } from '../dto/github-request-access-token.res.dto.js'
import type { GitHubRequestUserCodeResDto } from '../dto/github-request-user-code.res.dto.js'
import type { SignupResDto } from '../dto/signup.res.dto.js'
import type { GitHubDeviceFlowAuthResponse } from '../types/responses/github-device-flow-auth.response.type.js'
import type { GitHubDeviceFlowAuthEvents } from '../types/events/github-device-flow-auth.events.type.js'

const { EventEmitter } = browserifyEvents

class GitHubDeviceFlowAuth {

    private static PollingIntervalAdjustment = 500

    private eventEmitter = new EventEmitter()

    private deviceCode: string | undefined
    private githubAccessToken: string | undefined

    private pollingInterval = 5 * 1000
    private pollingTimer: NodeJS.Timeout | undefined

    constructor(
        private readonly httpClient: HttpClient,
        private readonly appName: string
    ) {}

    async signup(): Promise<void> {

        /* Step 1 - Request user code */
        const response1 = await this.requestUserCode()
        const [stage1] = response1

        this.dispatchEventsFromResponse(response1)

        if (stage1 === GitHubDeviceFlowAuthStage.Failed)
            return

        /* Step 2 - Poll GitHub access token */
        const response2 = await this.pollGitHubAccessToken()
        const [stage2] = response2

        this.dispatchEventsFromResponse(response2)

        if (stage2 === GitHubDeviceFlowAuthStage.Failed)
            return

        /* Step 3 - Request Minimouli access token */
        const response3 = await this.requestMinimouliAccessTokenBySignedUp()
        this.dispatchEventsFromResponse(response3)
    }

    on<E extends keyof GitHubDeviceFlowAuthEvents>(event: E, listener: GitHubDeviceFlowAuthEvents[E]): void {
        this.eventEmitter.on(event, listener)
    }

    once<E extends keyof GitHubDeviceFlowAuthEvents>(event: E, listener: GitHubDeviceFlowAuthEvents[E]) {
        this.eventEmitter.once(event, listener)
    }

    removeListener<E extends keyof GitHubDeviceFlowAuthEvents>(event: E, listener: GitHubDeviceFlowAuthEvents[E]) {
        this.eventEmitter.removeListener(event, listener)
    }

    stopRequestingAccessToken(): void {
        clearTimeout(this.pollingTimer)
    }

    private dispatchEventsFromResponse(response: GitHubDeviceFlowAuthResponse): void {

        const [stage, data] = response

        this.eventEmitter.emit('change', response)

        switch (stage) {
            case GitHubDeviceFlowAuthStage.Polling:
                this.eventEmitter.emit('polling', data)
                break
            case GitHubDeviceFlowAuthStage.Authorized:
                this.eventEmitter.emit('accepted', data)
                break
            case GitHubDeviceFlowAuthStage.Succeed:
                this.eventEmitter.emit('succeed', data)
                break
            case GitHubDeviceFlowAuthStage.Failed:
                this.eventEmitter.emit('error', new Error(data.error))
                break
            default:
        }
    }

    private async requestUserCode(): Promise<GitHubDeviceFlowAuthResponse> {

        const response = await POST<GitHubRequestUserCodeResDto>(new URL('https://github.com/login/device/code'), {
            body: {
                client_id: GitHubConfig.OAuthAppClientID,
                scope: GitHubConfig.OAuthAppScopes.join(' ')
            },
            validateStatus: () => true
        })

        if (response.error !== undefined)
            return [GitHubDeviceFlowAuthStage.Failed, { error: 'Unable to request the user code' }]

        this.deviceCode = response.device_code
        this.pollingInterval = response.interval * 1000

        return [GitHubDeviceFlowAuthStage.Polling, {
            userCode: response.user_code,
            verificationUri: new URL(response.verification_uri),
            expiresIn: response.expires_in * 1000
        }]
    }

    private async requestGitHubAccessToken(): Promise<GitHubDeviceFlowAuthResponse> {

        if (this.deviceCode === undefined)
            return [GitHubDeviceFlowAuthStage.Failed, {
                error: 'GitHubDeviceFlowAuth must request user code before requesting GitHub access token'
            }]

        return new Promise((resolve) => {

            this.pollingTimer = setTimeout(() => {
                void (async () => {

                    const response = await POST<GitHubRequestAccessTokenResDto>(new URL('https://github.com/login/oauth/access_token'), {
                        body: {
                            client_id: GitHubConfig.OAuthAppClientID,
                            device_code: this.deviceCode,
                            grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
                        }
                    })

                    this.pollingTimer = undefined

                    if (response.error === 'slow_down')
                        this.pollingInterval = response.interval * 1000

                    if (response.error !== undefined) {
                        resolve([GitHubDeviceFlowAuthStage.Failed, { error: response.error }])
                        return
                    }

                    this.githubAccessToken = response.access_token
                    resolve([GitHubDeviceFlowAuthStage.Authorized, {}])
                })()
            }, this.pollingInterval + GitHubDeviceFlowAuth.PollingIntervalAdjustment)
        })
    }

    private async pollGitHubAccessToken(): Promise<GitHubDeviceFlowAuthResponse> {

        let currentStage = GitHubDeviceFlowAuthStage.Polling
        const ignoredErrors = new Set([
            'authorization_pending',
            'slow_down'
        ])

        do {
            // eslint-disable-next-line no-await-in-loop
            const [stage, data] = await this.requestGitHubAccessToken()
            currentStage = stage

            if (stage === GitHubDeviceFlowAuthStage.Failed && !ignoredErrors.has(data.error))
                return [GitHubDeviceFlowAuthStage.Failed, { error: `Unable to request the GitHub access token (${data.error})` }]

        } while (currentStage !== GitHubDeviceFlowAuthStage.Authorized)

        return [GitHubDeviceFlowAuthStage.Authorized, {}]
    }

    private async requestMinimouliAccessTokenBySignedUp(): Promise<GitHubDeviceFlowAuthResponse> {

        if (this.githubAccessToken === undefined)
            return [GitHubDeviceFlowAuthStage.Failed, {
                error: 'GitHubDeviceFlowAuth must request GitHub access token before requesting Minimouli access token'
            }]

        try {
            const response = await this.httpClient.post<SignupResDto>('/auth/signup/github/access-token', {
                body: {
                    accessToken: this.githubAccessToken,
                    authTokenName: `Login with ${this.appName}`
                }
            })

            const accessToken = response.accessToken
            const client = new Client({
                accessToken,
                baseUrl: this.httpClient.baseUrl
            })
            const user = await client.accounts.me()

            return [GitHubDeviceFlowAuthStage.Succeed, {
                accessToken,
                client,
                user
            }]

        } catch {
            return [GitHubDeviceFlowAuthStage.Failed, { error: 'Unable to request the Minimouli access token' }]
        }
    }

}

export {
    GitHubDeviceFlowAuth
}
