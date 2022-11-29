/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Method } from '../enums/method.enum.js'

interface ErrorResDto {
    status: 'failure'
    statusCode: number
    error: string
    message: string | string[]
    timestamp: string
    path: string
    method: Method
}

export type {
    ErrorResDto
}
