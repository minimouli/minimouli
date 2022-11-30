/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type GitHubRequestAccessTokenResDto =
    | {
        access_token: string
        token_type: 'bearer'
        scope: string
        error: undefined
    }
    | {
        error: 'slow_down'
        interval: number
    }
    | { error: 'authorization_pending' }
    | { error: 'expired_token' }
    | { error: 'unsupported_grant_type' }
    | { error: 'incorrect_client_credentials' }
    | { error: 'incorrect_device_code' }
    | { error: 'access_denied' }
    | { error: 'device_flow_disabled' }

export type {
    GitHubRequestAccessTokenResDto
}
