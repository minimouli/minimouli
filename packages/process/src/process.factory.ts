/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import child_process from 'node:child_process'
import { Path } from '@minimouli/fs'
import { Descriptor } from '@minimouli/types/stream'
import { Process, TerminateSource } from './process.js'
import type stream from 'node:stream'
import type { Unit } from '@minimouli/types'
import type { FileDescriptorInstruction, ProcessStdioType, StdioValue } from './types/process-stdio.type.js'

type SpawnResponse =
    | {
        process: Process
        error?: undefined
    }
    | {
        error: string
        process?: undefined
    }

type ValidStdioValue = number | FileDescriptorInstruction | stream.Stream | null

const normalizeStdioValue = (value: StdioValue): ValidStdioValue => {

    if (value === null)
        // eslint-disable-next-line unicorn/no-null
        return null

    if (typeof value === 'object' && 'native' in value)
        return value.native

    return value
}

class ProcessFactory {

    private readonly name: string
    private args: string[]

    private _cwd: Path | undefined = undefined

    private _stdio: ProcessStdioType = {
        stdin: Descriptor.Stdin,
        stdout: Descriptor.Stdout,
        stderr: Descriptor.Stderr
    }

    private _ipc = false
    public timeout: Unit.ms = Number.NaN

    constructor(name: string | Path, args: string[] = []) {
        this.name = name.toString()
        this.args = args
    }

    cwd(cwd: Path): this {
        this._cwd = cwd
        return this
    }

    stdio(stdio: Partial<ProcessStdioType>): this {
        this._stdio = { ...this._stdio, ...stdio }
        return this
    }

    ipc(): this {
        this._ipc = true
        return this
    }

    setArguments(args: string[]): this {
        this.args = args
        return this
    }

    setTimeout(timeout: Unit.ms): this {
        this.timeout = timeout
        return this
    }

    spawn(): Promise<SpawnResponse> {

        return new Promise((resolve) => {

            const child = child_process.spawn(this.name, this.args, {
                cwd: (this._cwd ?? Path.current()).toString(),
                stdio: [
                    normalizeStdioValue(this._stdio.stdin),
                    normalizeStdioValue(this._stdio.stdout),
                    normalizeStdioValue(this._stdio.stderr),
                    this._ipc ? 'ipc' : 'ignore'
                ]
            })
            const process = new Process(child)

            if (this.timeout > 0) {

                const timer = setTimeout(() => {
                    process.terminate(TerminateSource.TIMEOUT, 'SIGKILL')
                }, this.timeout)

                child.on('exit', () => clearTimeout(timer))
            }

            process.on('error', () => resolve({
                error: 'The child process cannot be spawned'
            }))

            process.on('spawn', () => resolve({
                process
            }))
        })
    }

}

export {
    ProcessFactory
}
