/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'node:fs'
import { ReadableStream, WritableStream } from '@minimouli/io'
import { Entry } from './entry.js'
import type { ReadStreamOptions, StreamOptions } from '@minimouli/types/options'
import type { NativeReadable, NativeWritable, ReadableContent } from '@minimouli/types/stream'

type OpenReadableResponse =
    | {
        stream: NativeReadable
        error?: undefined
    }
    | {
        error: string
        stream?: undefined
    }

type OpenWritableResponse =
    | {
        stream: NativeWritable
        error?: undefined
    }
    | {
        error: string
        stream?: undefined
    }

class File extends Entry {

    async openReadable(options: Partial<ReadStreamOptions> = {}): Promise<OpenReadableResponse> {

        return new Promise((resolve) => {

            const stream = fs.createReadStream(this.path.toString(), options)

            stream.on('error', () => resolve({
                error: 'Cannot open a readable stream'
            }))

            stream.on('ready', () => resolve({
                stream: new ReadableStream(stream)
            }))
        })
    }

    async openWritable(options: Partial<StreamOptions> = {}): Promise<OpenWritableResponse> {

        return new Promise((resolve) => {

            const stream = fs.createWriteStream(this.path.toString(), options)

            stream.on('error', () => resolve({
                error: 'Cannot open a writable stream'
            }))

            stream.on('ready', () => resolve({
                stream: new WritableStream(stream)
            }))
        })
    }

    async getContents(options: Partial<ReadStreamOptions> = {}): Promise<{
        contents: ReadableContent
        error: string | undefined
    }> {

        const { stream, error } = await this.openReadable(options)

        if (error !== undefined)
            // eslint-disable-next-line unicorn/no-null
            return { error, contents: null }

        const contents = await stream.getContents()
        stream.close()

        return contents
    }

}

export {
    File
}
