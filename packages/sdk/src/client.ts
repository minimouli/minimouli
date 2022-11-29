/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpClient } from './http-client.js'
import { AccountResource } from './resources/account.resource.js'
import { OrganizationResource } from './resources/organization.resource.js'
import type { ClientOptions } from './types/options/client.options.type.js'

class Client {

    public readonly accounts: AccountResource
    public readonly organizations: OrganizationResource

    constructor(options: Partial<ClientOptions>) {

        const httpClient = new HttpClient(
            options.accessToken,
            options.baseUrl ?? 'https://api.minimouli.com'
        )

        this.accounts = new AccountResource(httpClient)
        this.organizations = new OrganizationResource(httpClient)
    }

}

export {
    Client
}
