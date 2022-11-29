/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpClient } from './http-client.js'
import { AccountResource } from './resources/account.resource.js'
import { MoulinetteResource } from './resources/moulinette.resource.js'
import { OrganizationResource } from './resources/organization.resource.js'
import { ProjectResource } from './resources/project.resource.js'
import type { ClientOptions } from './types/options/client.options.type.js'

class Client {

    public readonly accounts: AccountResource
    public readonly moulinettes: MoulinetteResource
    public readonly organizations: OrganizationResource
    public readonly projects: ProjectResource

    constructor(options: Partial<ClientOptions>) {

        const httpClient = new HttpClient(
            options.accessToken,
            options.baseUrl ?? 'https://api.minimouli.com'
        )

        this.accounts = new AccountResource(httpClient)
        this.moulinettes = new MoulinetteResource(httpClient)
        this.organizations = new OrganizationResource(httpClient)
        this.projects = new ProjectResource(httpClient)
    }

}

export {
    Client
}
