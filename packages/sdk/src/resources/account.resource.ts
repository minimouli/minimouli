/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AccountEntity } from '../entities/account.entity.js'
import type { HttpClient } from '../http-client.js'
import type { AccountResDto } from '../dto/account.res.dto.js'

class AccountResource {

    constructor(
        private readonly httpClient: HttpClient
    ) {}

    async me(): Promise<AccountEntity> {
        const response = await this.httpClient.get<AccountResDto>('/me')
        return new AccountEntity(this.httpClient, response)
    }

    async get(id: string): Promise<AccountEntity> {
        const response = await this.httpClient.get<AccountResDto>(`/account/${id}`)
        return new AccountEntity(this.httpClient, response)
    }

}

export {
    AccountResource
}
