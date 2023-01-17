/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ErrorResDto } from '../dto/error.res.dto.js'
import type { Method } from '../enums/method.enum.js'

const isMinimouliClientError = (error: unknown): error is MinimouliClientError =>
    error instanceof MinimouliClientError

class MinimouliClientError extends Error {

    public readonly statusCode: number
    public readonly error: string
    public readonly fullMessage: string | string[]
    public readonly timestamp: Date
    public readonly path: string
    public readonly method: Method

    constructor(response: ErrorResDto) {
        super(Array.isArray(response.message) ? response.message.at(0) : response.message)

        this.statusCode = response.statusCode
        this.error = response.error
        this.fullMessage = response.message
        this.timestamp = new Date(response.timestamp)
        this.path = response.path
        this.method = response.method
    }

}

export {
    isMinimouliClientError,
    MinimouliClientError
}
