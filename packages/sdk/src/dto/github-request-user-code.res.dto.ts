/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type GitHubRequestUserCodeResDto =
    | {
        device_code: string
        user_code: string
        verification_uri: string
        expires_in: number
        interval: number
        error: undefined
    }
    | {
        error: string
    }

export type {
    GitHubRequestUserCodeResDto
}

