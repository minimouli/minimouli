/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type stream from 'node:stream'
import type { Writable } from './Writable.js'
import type { Callable } from '../Callable.js'

interface NativeWritableEvents {
    close: Callable
    drain: Callable
    error: Callable<[Error]>
    finish: Callable
    pipe: Callable<[stream.Readable]>
    unpipe: Callable<[stream.Readable]>
}

interface NativeWritable extends Writable {

    /**
     * Sets up a listener that will be called whenever the specified event is delivered.
     */
    on<E extends keyof NativeWritableEvents>(event: E, listener: NativeWritableEvents[E]): void

    /**
     * Sets up a listener that will be called the first time the specified event is delivered.
     */
    once<E extends keyof NativeWritableEvents>(event: E, listener: NativeWritableEvents[E]): void

    /**
     * Removes a previously added listener.
     */
    removeListener<E extends keyof NativeWritableEvents>(event: E, listener: NativeWritableEvents[E]): void

    /**
     * Returns the native implementation of the Writable.
     */
    get native(): stream.Writable

}

export type {
    NativeWritable,
    NativeWritableEvents
}
