/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { EntityType } from '../enums/entity-type.enum.js'
import type { Permission } from '../enums/permission.enum.js'

interface AccountResDto {
    object: EntityType.Account
    id: string
    nickname: string
    username: string
    avatar: string
    email?: string
    permissions?: Permission[]
    uri: string
    updatedAt: string
    createdAt: string
}

export type {
    AccountResDto
}
