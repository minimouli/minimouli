/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ProcessFactory } from '@minimouli/process'
import { Executable } from './executable.js'
import { Path } from './path.js'
import { MatcherError } from '../errors/matcher.error.js'

class GPP {

    constructor(
        private readonly sources: Path[]
    ) {}

    async execute(args: string[] = []): Promise<Executable> {

        const executablePath = Path.tmp()
            .join('minimouli')
            .random()

        const fullArguments = [
            ...this.sources.map((source) => source.toString()),
            '-o',
            executablePath.toString(),
            ...args
        ]

        const { process: gpp, error } = await new ProcessFactory('g++', fullArguments)
            .cwd(Path.fromProject())
            .stdio({
                stdin: 'pipe',
                stdout: 'ignore',
                stderr: 'ignore'
            })
            .spawn()

        if (error !== undefined)
            throw new MatcherError('Cannot spawn the process, please check if g++ is correctly installed')

        const { code } = await gpp.wait()

        if (code !== 0)
            throw new MatcherError(`The compilation resulted with a failure (code: ${code === null ? 'null' : code})`)

        return new Executable(executablePath)
    }

}

export {
    GPP
}
