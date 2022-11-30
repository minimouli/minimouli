/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Callable, Unit } from '@minimouli/types'
import type { GitHubDeviceFlowAuthResponse } from '../responses/github-device-flow-auth.response.type.js'
import type { Client } from '../../client.js'
import type { AccountEntity } from '../../entities/account.entity.js'

interface GitHubDeviceFlowAuthEvents {
    polling: Callable<[{
        userCode: string
        verificationUri: URL
        expiresIn: Unit.ms
    }]>
    authorized: Callable
    succeed: Callable<[{
        client: Client
        user: AccountEntity
        accessToken: string
    }]>
    change: Callable<[GitHubDeviceFlowAuthResponse]>
    error: Callable<[Error]>
}

export type {
    GitHubDeviceFlowAuthEvents
}
