/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EventEmitter } from 'node:events'
import type { Serializable } from 'node:child_process'
import type { Process } from '@minimouli/process'
import type { Callable } from '@minimouli/types'
import type { Message } from './Message.js'

type SupportedProcess = Process | NodeJS.Process
type EventDescriptions = Record<string, unknown[]>
type EventEmitterCallable = (...args: unknown[]) => void

class Channel<Issued extends EventDescriptions, Received extends EventDescriptions> {

    private process: SupportedProcess
    private emitter = new EventEmitter()

    private constructor(process: SupportedProcess) {
        this.process = process

        this.process.on('message', (data: Serializable) => {
            this.dispatch(data as Message<Received>)
        })
    }

    static fromCurrentProcess<Issued extends EventDescriptions, Received extends EventDescriptions>(): Channel<Issued, Received> {
        return new Channel(process)
    }

    static fromChildProcess<Issued extends EventDescriptions, Received extends EventDescriptions>(subprocess: Process): Channel<Issued, Received> {
        return new Channel(subprocess)
    }

    protected dispatch(message: Message<Received>): void {
        const { event, args } = message
        this.emitter.emit(event.toString(), args)
    }

    on<Event extends keyof Received>(event: Event, listener: Callable<Received[Event]>): void {
        this.emitter.on(event.toString(), listener as EventEmitterCallable)
    }

    remove<Event extends keyof Received>(event: Event, listener: Callable<Received[Event]>): void {
        this.emitter.removeListener(event.toString(), listener as EventEmitterCallable)
    }

    emit<Event extends keyof Issued>(event: Event, ...args: Issued[Event]): void {

        const message: Message<Issued> = {
            event,
            args
        }

        if (this.process.send)
            this.process.send(message)
    }

    disconnect(): void {
        this.process.disconnect()
    }

}

export {
    Channel
}
export type {
    EventDescriptions
}
