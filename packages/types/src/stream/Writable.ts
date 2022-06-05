/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Stream, WritableContent } from './Stream.js'

interface Writable extends Stream {

    /**
     * Returns if the stream is writable or not.
     */
    get writable(): boolean

    /**
     * Writes contents to the stream.
     */
    write(contents: WritableContent): void

    /**
     * Writes contents to the stream followed by a line separator.
     */
    writeln(contents: string): void

}

export type {
    Writable
}
