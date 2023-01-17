/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HttpClient } from '../http-client.js'
import type { AccountResDto } from '../dto/account.res.dto.js'
import type { Permission } from '../enums/permission.enum.js'

class AccountEntity {

    public readonly id: string
    public readonly nickname: string
    public readonly username: string
    public readonly avatar: string
    public readonly email: string | undefined
    public readonly permissions: Permission[] | undefined
    public readonly uri: string
    public readonly updatedAt: Date
    public readonly createdAt: Date

    constructor(httpClient: HttpClient, response: AccountResDto) {
        void httpClient

        this.id = response.id
        this.nickname = response.nickname
        this.username = response.username
        this.avatar = response.avatar
        this.email = response.email
        this.permissions = response.permissions
        this.uri = response.uri
        this.updatedAt = new Date(response.updatedAt)
        this.createdAt = new Date(response.createdAt)
    }

}

export {
    AccountEntity
}
