/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EventEmitter } from 'node:events'
import { Channel } from '@minimouli/ipc'
import { ProcessFactory } from '@minimouli/process'
import type { Path } from '@minimouli/fs'
import type { EventDescriptions } from '@minimouli/ipc'
import type { Process } from '@minimouli/process'
import type { Unit } from '@minimouli/types'
import type { MoulinetteConfig } from '@minimouli/types/config'
import type { SuiteSynthesis, SuiteSynthesisPlan, TestStatus } from '@minimouli/types/syntheses'
import type { ErrorCatcherResponse } from './types/ErrorCatcherResponse.js'
import type { PlanResponse } from './types/PlanResponse.js'
import type { RunResponse } from './types/RunResponse.js'
import type { WorkerEvents } from './types/WorkerEvents.js'

interface IssuedEvents extends EventDescriptions {
    init: [MoulinetteConfig]
    plan: []
    run: []
}

interface ReceivedEvents extends EventDescriptions {
    'init:success': []
    'plan:result': [SuiteSynthesisPlan[]]
    'run:result': [SuiteSynthesis[]]
    'test:perform': [string, string[]]
    'test:complete': [string, string[], TestStatus, Unit.ms]
}

class Worker {

    private childProcess: Process | undefined
    private channel: Channel<IssuedEvents, ReceivedEvents> | undefined
    private emitter = new EventEmitter()

    constructor(
        private id: number,
        private testsFilePath: Path
    ) {}

    on<E extends keyof WorkerEvents>(event: E, listener: WorkerEvents[E]): void {
        this.emitter.on(event, listener)
    }

    removeListener<E extends keyof WorkerEvents>(event: E, listener: WorkerEvents[E]): void {
        this.emitter.removeListener(event, listener)
    }

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

        this.channel.on('test:perform', (...args) => {
            this.emitter.emit('test:perform', this.id, ...args)
        })
        this.channel.on('test:complete', (...args) => {
            this.emitter.emit('test:complete', this.id, ...args)
        })

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

    async plan(): Promise<PlanResponse> {

        if (this.channel === undefined)
            return { error: 'The worker must be prepared before', syntheses: undefined }

        const channel = this.channel

        return new Promise((resolve) => {

            const handleResult = (syntheses: SuiteSynthesisPlan[]) => {
                channel.remove('plan:result', handleResult)

                resolve({ syntheses, error: undefined })
            }

            channel.on('plan:result', handleResult)
            channel.emit('plan')
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
