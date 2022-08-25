/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Channel } from '@minimouli/ipc'
import { ProcessFactory } from '@minimouli/process'
import type { Path } from '@minimouli/fs'
import type { EventDescriptions } from '@minimouli/ipc'
import type { Process } from '@minimouli/process'
import type { MoulinetteConfig } from '@minimouli/types/config.js'
import type { SuiteSynthesis } from '@minimouli/types/syntheses.js'
import type { ErrorCatcherResponse } from './types/ErrorCatcherResponse.js'
import type { RunResponse } from './types/RunResponse.js'

interface IssuedEvents extends EventDescriptions {
    init: [MoulinetteConfig]
    run: []
}

interface ReceivedEvents extends EventDescriptions {
    'init:success': []
    'run:result': [SuiteSynthesis[]]
}

class Worker {

    private childProcess: Process | undefined
    private channel: Channel<IssuedEvents, ReceivedEvents> | undefined

    constructor(
        private testsFilePath: Path
    ) {}

    async load(): Promise<ErrorCatcherResponse> {

        const { process: node, error } = await new ProcessFactory('node', [this.testsFilePath.toString()])
            .stdio({
                stdin: 'ignore',
                stdout: 'ignore',
                stderr: 'ignore'
            })
            .ipc()
            .spawn()

        if (error !== undefined)
            return { error: 'The worker cannot spawn a child process from the tests file' }

        this.childProcess = node
        this.channel = Channel.fromChildProcess<IssuedEvents, ReceivedEvents>(node)
        return { error: undefined }
    }

    async prepare(config: MoulinetteConfig): Promise<ErrorCatcherResponse> {

        if (this.channel === undefined)
            return { error: 'The worker must be loaded before being prepared' }

        const channel = this.channel

        return new Promise((resolve) => {

            const handleInitSuccess = () => {
                channel.remove('init:success', handleInitSuccess)
                resolve({ error: undefined })
            }

            channel.on('init:success', handleInitSuccess)
            channel.emit('init', config)
        })
    }

    async run(): Promise<RunResponse> {

        if (this.channel === undefined)
            return { error: 'The worker must be prepared before', syntheses: undefined }

        const channel = this.channel

        return new Promise((resolve) => {

            const handleResult = (syntheses: SuiteSynthesis[]) => {
                channel.remove('run:result', handleResult)
                resolve({ syntheses, error: undefined })
            }

            channel.on('run:result', handleResult)
            channel.emit('run')
        })
    }

    terminate(): void {

        if (this.childProcess === undefined)
            return

        this.childProcess.disconnect()
    }

}

export {
    Worker
}
