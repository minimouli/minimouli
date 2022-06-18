/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import child_process from 'node:child_process'
import { Path } from '@minimouli/fs'
import { Descriptor } from '@minimouli/types/stream.js'
import { Process } from './Process.js'
import type stream from 'node:stream'
import type { ProcessStdio, StdioValue, FileDescriptorInstruction } from './ProcessStdio.js'

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

    private name: string
    private args: string[]

    private _cwd: Path | undefined = undefined

    private _stdio: ProcessStdio = {
        stdin: Descriptor.STDIN,
        stdout: Descriptor.STDOUT,
        stderr: Descriptor.STDERR
    }

    private _ipc = false

    constructor(name: string | Path, args: string[] = []) {
        this.name = name.toString()
        this.args = args
    }

    cwd(cwd: Path): this {
        this._cwd = cwd
        return this
    }

    stdio(stdio: Partial<ProcessStdio>): this {
        this._stdio = { ...this._stdio, ...stdio }
        return this
    }

    ipc(): this {
        this._ipc = true
        return this
    }

    spawn(): Process {

        const child = child_process.spawn(this.name, this.args, {
            cwd: (this._cwd ?? Path.current()).toString(),
            stdio: [
                normalizeStdioValue(this._stdio.stdin),
                normalizeStdioValue(this._stdio.stdout),
                normalizeStdioValue(this._stdio.stderr),
                this._ipc ? 'ipc' : 'ignore'
            ]
        })

        return new Process(child)
    }

}

export {
    ProcessFactory
}
