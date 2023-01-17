/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ProcessFactory } from '@minimouli/process'
import { MatcherError } from '../errors/matcher.error.js'
import type { Path } from './path.js'

class Makefile {

    constructor(
        private readonly workingDirectory: Path
    ) {}

    async execute(rule?: string | undefined): Promise<void> {

        const args = rule !== undefined ? [rule] : []
        const { process: make, error } = await new ProcessFactory('make', args)
            .cwd(this.workingDirectory)
            .stdio({
                stdin: 'pipe',
                stdout: 'ignore',
                stderr: 'ignore'
            })
            .spawn()

        if (error !== undefined)
            throw new MatcherError('Cannot spawn the process, please check if make is correctly installed')

        const { code } = await make.wait()

        if (code !== 0)
            throw new MatcherError(`The compilation resulted with a failure (code: ${code === null ? 'null' : code})`)
    }

}

export {
    Makefile
}
