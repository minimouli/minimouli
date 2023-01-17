/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface StreamOptions {
    flags: string
    encoding: BufferEncoding
    mode: number
    autoClose: boolean
    emitClose: boolean
    start: number
    highWaterMark: number
}

interface ReadStreamOptions extends StreamOptions {
    end: number
}

export type {
    StreamOptions,
    ReadStreamOptions
}
