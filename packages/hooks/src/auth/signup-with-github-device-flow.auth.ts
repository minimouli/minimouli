/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Client } from '@minimouli/sdk'
import type { ClientOptions, GitHubDeviceFlowAuth, GitHubDeviceFlowAuthEvents } from '@minimouli/sdk'

class SignupWithGitHubDeviceFlowAuth {

    private readonly auth: GitHubDeviceFlowAuth

    constructor(appName: string, options: Partial<ClientOptions> = {}) {
        const client = new Client(options)
        this.auth = client.GitHubDeviceFlowAuth(appName)
    }

    on<E extends keyof GitHubDeviceFlowAuthEvents>(event: E, listener: GitHubDeviceFlowAuthEvents[E]): this {
        this.auth.on(event, listener)
        return this
    }

    once<E extends keyof GitHubDeviceFlowAuthEvents>(event: E, listener: GitHubDeviceFlowAuthEvents[E]): this {
        this.auth.once(event, listener)
        return this
    }

    removeListener<E extends keyof GitHubDeviceFlowAuthEvents>(event: E, listener: GitHubDeviceFlowAuthEvents[E]): this {
        this.auth.removeListener(event, listener)
        return this
    }

    abortAllRequests(): void {
        this.auth.abortAllRequests()
    }

    signup(): this {
        void this.auth.signup()
        return this
    }

}

export {
    SignupWithGitHubDeviceFlowAuth
}
