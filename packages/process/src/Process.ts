/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ReadableStream, WritableStream } from '@minimouli/io'
import type child_process from 'node:child_process'
import type { NativeReadable, NativeWritable } from '@minimouli/types/stream.js'
import type { Callable } from '@minimouli/types'

interface ProcessEvents {
    close: Callable<[number | null, NodeJS.Signals | null]>
    disconnect: Callable
    error: Callable<[Error]>
    exit: Callable<[number | null, NodeJS.Signals | null]>
    message: Callable<[child_process.Serializable, child_process.SendHandle]>
    spawn: Callable
}

class Process {

    private child: child_process.ChildProcess

    public readonly stdin: NativeWritable | undefined = undefined
    public readonly stdout: NativeReadable | undefined = undefined
    public readonly stderr: NativeReadable | undefined = undefined

    constructor(child: child_process.ChildProcess) {
        this.child = child

        if (child.stdin)
            this.stdin = new WritableStream(child.stdin)

        if (child.stdout)
            this.stdout = new ReadableStream(child.stdout)

        if (child.stderr)
            this.stderr = new ReadableStream(child.stderr)
    }

    on<E extends keyof ProcessEvents>(event: E, listener: ProcessEvents[E]): void {
        this.child.on(event, listener)
    }

    once<E extends keyof ProcessEvents>(event: E, listener: ProcessEvents[E]): void {
        this.child.once(event, listener)
    }

    removeListener<E extends keyof ProcessEvents>(event: E, listener: ProcessEvents[E]): void {
        this.child.removeListener(event, listener)
    }

    get pid(): number | undefined {
        return this.child.pid
    }

    get exitCode(): number | null {
        return this.child.exitCode
    }

}

export {
    Process
}
export type {
    ProcessEvents
}
