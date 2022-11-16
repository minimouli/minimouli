/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type WritableContent = string | Buffer | Uint8Array
type ReadableContent = string | Buffer | null

interface Stream {

    /**
     * Closes the stream and any underlying resources.
     */
    close(): void

    /**
     * Separates any underlying resources from the stream.
     * After the stream has been detached, the stream is in an unusable state.
     */
    detach(): void

    /**
     * Gets the size of the stream if known.
     */
    get size(): number | undefined

    /**
     * Returns true if the stream is at the end of the stream, false otherwise.
     */
    get eof(): boolean

}

export type {
    Stream,
    ReadableContent,
    WritableContent
}
