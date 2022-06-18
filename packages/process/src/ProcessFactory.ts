/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import child_process from 'node:child_process'
import { Path } from '@minimouli/fs'
import { Process } from './Process.js'

class ProcessFactory {

    private name: string
    private args: string[]

    private _cwd: Path | undefined = undefined

    constructor(name: string | Path, args: string[] = []) {
        this.name = name.toString()
        this.args = args
    }

    cwd(cwd: Path): this {
        this._cwd = cwd
        return this
    }

    spawn(): Process {

        const child = child_process.spawn(this.name, this.args, {
            cwd: (this._cwd ?? Path.current()).toString(),
            stdio: [
                'inherit',
                'inherit',
                'inherit'
            ]
        })

        return new Process(child)
    }

}

export {
    ProcessFactory
}
