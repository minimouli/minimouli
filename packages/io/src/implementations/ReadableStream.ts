/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stream from 'node:stream'
import { ReadableMode } from '@minimouli/types/stream'
import { DetachedStreamError } from '../errors/DetachedStreamError.js'
import { StreamError } from '../errors/StreamError.js'
import type {
    NativeReadable,
    NativeReadableEvents,
    NativeWritable,
    ReadableContent
} from '@minimouli/types/stream'

class ReadableStream implements NativeReadable {

    protected stream: stream.Readable | undefined

    constructor(stream_: stream.Readable) {
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

        return this.stream.readableEnded
    }

    get readable(): boolean {

        if (!this.stream)
            return false

        return this.stream.readable
    }

    read(length: number): ReadableContent {

        if (!this.stream)
            throw new DetachedStreamError()

        if (!this.readable)
            throw new StreamError('The stream is not readable')

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.stream.read(length)
    }

    async getContents(): Promise<{
        contents: ReadableContent
        error: string | undefined
    }> {

        if (!this.stream)
            // eslint-disable-next-line unicorn/no-null
            return { error: 'The stream is detached', contents: null }

        if (!this.stream.readable)
            // eslint-disable-next-line unicorn/no-null
            return { error: 'The stream is not readable', contents: null }

        const chunks = []

        for await (const chunk of this.stream)
            chunks.push(chunk)

        return { contents: Buffer.concat(chunks).toString(), error: undefined }
    }

    get mode(): ReadableMode {

        if (!this.stream)
            throw new DetachedStreamError()

        switch (this.stream.readableFlowing) {
            case true:
                return ReadableMode.FLOW
            case false:
                return ReadableMode.PAUSE
            default:
                return ReadableMode.NULL
        }
    }

    pipe(destination: NativeWritable | stream.Writable): void {

        if (!this.stream)
            throw new DetachedStreamError()

        if (destination instanceof stream.Writable)
            this.stream.pipe(destination)
        else
            this.stream.pipe(destination.native)
    }

    on<E extends keyof NativeReadableEvents>(event: E, listener: NativeReadableEvents[E]): void {

        if (!this.stream)
            throw new DetachedStreamError()

        this.stream.on(event, listener)
    }

    once<E extends keyof NativeReadableEvents>(event: E, listener: NativeReadableEvents[E]): void {

        if (!this.stream)
            throw new DetachedStreamError()

        this.stream.once(event, listener)
    }

    removeListener<E extends keyof NativeReadableEvents>(event: E, listener: NativeReadableEvents[E]): void {

        if (!this.stream)
            throw new DetachedStreamError()

        this.stream.removeListener(event, listener)
    }

    get native(): stream.Readable {

        if (!this.stream)
            throw new DetachedStreamError()

        return this.stream
    }

}

export {
    ReadableStream
}
