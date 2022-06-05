/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DetachedStreamError } from '../errors/DetachedStreamError.js'
import { StreamError } from '../errors/StreamError.js'
import type stream from 'node:stream'
import type {
    NativeWritable,
    NativeWritableEvents,
    WritableContent
} from '@minimouli/types/stream.js'

class WritableStream implements NativeWritable {

    protected stream: stream.Writable | undefined

    constructor(stream_: stream.Writable) {
        this.stream = stream_
    }

    close(): void {

        if (!this.stream)
            return

        this.stream.destroy()
        this.detach()
    }

    detach(): void {
        this.stream = undefined
    }

    get size(): undefined {
        return undefined
    }

    get eof(): boolean {

        if (!this.stream)
            throw new DetachedStreamError()

        return this.stream.writableEnded
    }

    get writable(): boolean {

        if (!this.stream)
            throw new DetachedStreamError()

        return this.stream.writable
    }

    write(contents: WritableContent): void {

        if (!this.stream)
            throw new DetachedStreamError()

        if (!this.writable)
            throw new StreamError('The stream is not writable')

        this.stream.write(contents)
    }

    writeln(contents: string): void {
        this.write(`${contents}\n`)
    }

    on<E extends keyof NativeWritableEvents>(event: E, listener: NativeWritableEvents[E]): void {

        if (!this.stream)
            throw new DetachedStreamError()

        this.stream.on(event, listener)
    }

    once<E extends keyof NativeWritableEvents>(event: E, listener: NativeWritableEvents[E]): void {

        if (!this.stream)
            throw new DetachedStreamError()

        this.stream.once(event, listener)
    }

    removeListener<E extends keyof NativeWritableEvents>(event: E, listener: NativeWritableEvents[E]): void {

        if (!this.stream)
            throw new DetachedStreamError()

        this.stream.removeListener(event, listener)
    }

    get native(): stream.Writable {

        if (!this.stream)
            throw new DetachedStreamError()

        return this.stream
    }

}

export {
    WritableStream
}
