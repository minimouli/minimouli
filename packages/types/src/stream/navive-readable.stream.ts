/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type stream from 'node:stream'
import type { NativeWritable } from './native-readable.stream.js'
import type { Readable } from './readable.stream.js'
import type { ReadableContent } from './stream.js'
import type { Callable } from '../callable.js'

interface NativeReadableEvents {
    close: Callable
    data: Callable<[ReadableContent]>
    end: Callable
    error: Callable<[Error]>
    pause: Callable
    readable: Callable
    resume: Callable
}

interface NativeReadable extends Readable {

    /**
     * Attaches a writable object and push all the data to the attached object.
     */
    pipe(destination: NativeWritable): void
    pipe(destination: stream.Writable): void

    /**
     * Sets up a listener that will be called whenever the specified event is delivered.
     */
    on<E extends keyof NativeReadableEvents>(event: E, listener: NativeReadableEvents[E]): void

    /**
     * Sets up a listener that will be called the first time the specified event is delivered.
     */
    once<E extends keyof NativeReadableEvents>(event: E, listener: NativeReadableEvents[E]): void

    /**
     * Removes a previously added listener.
     */
    removeListener<E extends keyof NativeReadableEvents>(event: E, listener: NativeReadableEvents[E]): void

    /**
     * Returns the native implementation of the Readable.
     */
    get native(): stream.Readable

}

export type {
    NativeReadable,
    NativeReadableEvents
}
