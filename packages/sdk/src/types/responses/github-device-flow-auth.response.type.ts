/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Unit } from '@minimouli/types'
import type { Client } from '../../client.js'
import type { AccountEntity } from '../../entities/account.entity.js'
import type { GitHubDeviceFlowAuthStage } from '../../enums/github-device-flow-auth-stage.enum.js'

type GitHubDeviceFlowAuthResponse =
    | [GitHubDeviceFlowAuthStage.Loading, Record<string, never>]
    | [GitHubDeviceFlowAuthStage.Polling, {
        userCode: string
        verificationUri: URL
        expiresIn: Unit.ms
    }]
    | [GitHubDeviceFlowAuthStage.Authorized, Record<string, never>]
    | [GitHubDeviceFlowAuthStage.Succeed, {
        client: Client
        user: AccountEntity
        accessToken: string
    }]
    | [GitHubDeviceFlowAuthStage.Failed, {
        error: string
    }]

export type {
    GitHubDeviceFlowAuthResponse
}
