/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { AccountResDto } from './account.res.dto.js'

interface SignupResDto {
    account: AccountResDto
    accessToken: string
}

export type {
    SignupResDto
}
