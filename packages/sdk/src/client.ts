/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpClient } from './http-client.js'
import { GitHubDeviceFlowAuth } from './auth/github-device-flow.auth.js'
import { AccountResource } from './resources/account.resource.js'
import { MoulinetteResource } from './resources/moulinette.resource.js'
import { OrganizationResource } from './resources/organization.resource.js'
import { ProjectResource } from './resources/project.resource.js'
import { RunResource } from './resources/run.resource.js'
import type { ClientOptions } from './types/options/client.options.type.js'

class Client {

    private readonly httpClient: HttpClient

    public readonly accounts: AccountResource
    public readonly moulinettes: MoulinetteResource
    public readonly organizations: OrganizationResource
    public readonly projects: ProjectResource
    public readonly runs: RunResource

    constructor(options: Partial<ClientOptions> = {}) {

        this.httpClient = new HttpClient(
            options.accessToken,
            options.baseUrl ?? 'https://api.minimouli.com'
        )

        this.accounts = new AccountResource(this.httpClient)
        this.moulinettes = new MoulinetteResource(this.httpClient)
        this.organizations = new OrganizationResource(this.httpClient)
        this.projects = new ProjectResource(this.httpClient)
        this.runs = new RunResource(this.httpClient)
    }

    GitHubDeviceFlowAuth(appName: string): GitHubDeviceFlowAuth {
        return new GitHubDeviceFlowAuth(this.httpClient, appName)
    }

    abortAllRequests(): void {
        this.httpClient.abortAllRequests()
    }

}

export {
    Client
}
