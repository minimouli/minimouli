/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type child_process from 'node:child_process'
import type { Process } from '@minimouli/process'
import type { Callable } from '@minimouli/types'
import type { Message } from './Message.js'

type ChannelProcess = Process | NodeJS.Process
type ChannelEvents = Record<string, unknown[]>
type ChannelEventsMap<T extends ChannelEvents> = {
    [E in keyof T]?: Callable<T[E]>[]
}

class Channel<T extends ChannelEvents> {

    private process: ChannelProcess
    private listeners: ChannelEventsMap<T> = {}

    private constructor(process: ChannelProcess) {
        this.process = process

        this.process.on('message', (data: child_process.Serializable) => {
            this.dispatch(data as Message<ChannelEvents>)
        })
    }

    static fromCurrentProcess<T extends ChannelEvents>(): Channel<T> {
        return new Channel<T>(process)
    }

    static fromSubprocess<T extends ChannelEvents>(subprocess: Process): Channel<T> {
        return new Channel<T>(subprocess)
    }

    on<E extends keyof T>(event: E, listener: Callable<T[E]>): void {
        const listeners = this.listeners[event] ?? []
        this.listeners[event] = [...listeners, listener]
    }

    emit<E extends keyof T>(event: E, ...args: T[E]): void {

        const message: Message<ChannelEvents> = {
            event: event.toString(),
            args
        }

        if (this.process.send)
            this.process.send(message)
    }

    private dispatch(message: Message<ChannelEvents>): void {

        const { event, args } = message
        const listeners = this.listeners[event] ?? []

        for (const listener of listeners)
            // @ts-expect-error Message arguments are typed as unknown[], fix this later if possible
            listener(...args)
    }

    disconnect(): void {
        this.process.disconnect()
    }

}

export {
    Channel
}
export type {
    ChannelEvents
}
