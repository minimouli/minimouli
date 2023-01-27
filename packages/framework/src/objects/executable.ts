/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Directory, File } from '@minimouli/fs'
import { ProcessFactory } from '@minimouli/process'
import { Path } from './path.js'
import { config } from '../config.js'
import { MatcherError } from '../errors/matcher.error.js'
import type { Process } from '@minimouli/process'
import type { Unit } from '@minimouli/types'
import type { ExecutableInterface } from '@minimouli/types/interfaces'
import type { NativeWritable } from '@minimouli/types/stream'

type ValidArguments = (string | Path)[]

const getExecutablePath = (executable: string | Path): Path => {

    if (typeof executable === 'string') {

        const binary = config.binaries[executable]

        if (binary === undefined)
            throw new MatcherError(`The ${executable} binary is not available`)

        return Path.fromProject(binary)
    }

    return executable
}

class Executable implements ExecutableInterface {

    private processFactory: ProcessFactory
    private process: Process | undefined

    private outputBasePath = Path.tmp().join('minimouli')
    public readonly savedStdoutPath = this.outputBasePath.random()
    public readonly savedStderrPath = this.outputBasePath.random()

    constructor(executable: string | Path, args: ValidArguments = []) {

        const executablePath = getExecutablePath(executable)
        const stringifiedArguments = args.map((argument) => argument.toString())

        this.processFactory = new ProcessFactory(executablePath, stringifiedArguments)
            .cwd(Path.fromProject())
            .stdio({
                stdin: 'pipe',
                stdout: 'pipe',
                stderr: 'pipe'
            })
            .setTimeout(5000)
    }

    setArguments(args: string[]): this {
        this.processFactory.setArguments(args)
        return this
    }

    setTimeout(timeout: Unit.ms): this {
        this.processFactory.setTimeout(timeout)
        return this
    }

    kill(signal: NodeJS.Signals = 'SIGTERM'): void {

        if (this.process === undefined)
            throw new MatcherError('The process is not yet spawned')

        this.process.kill(signal)
    }

    async execute(): Promise<void> {

        const outputBaseDirectory = new Directory(this.outputBasePath)
        const savedStdoutFile = new File(this.savedStdoutPath)
        const savedStderrFile = new File(this.savedStderrPath)

        const { error: error1 } = await outputBaseDirectory.mkdir({
            recursive: true
        })
        if (error1 !== undefined)
            throw new MatcherError('Cannot create the output directory')

        const { stream: stdoutFileStream, error: error2 } = await savedStdoutFile.openWritable()
        if (error2 !== undefined)
            throw new MatcherError('Cannot open the redirection file of the standard output')

        const { stream: stderrFileStream, error: error3 } = await savedStderrFile.openWritable()
        if (error3 !== undefined)
            throw new MatcherError('Cannot open the redirection file of the standard error output')

        const { process, error: error4 } = await this.processFactory.spawn()
        if (error4 !== undefined)
            throw new MatcherError('Cannot spawn the process')

        this.process = process
        const stdout = process.stdout
        const stderr = process.stderr

        if (stdout === undefined)
            throw new MatcherError('Cannot access the standard output of the process')

        if (stderr === undefined)
            throw new MatcherError('Cannot access the standard error output of the process')

        stdout.pipe(stdoutFileStream)
        stderr.pipe(stderrFileStream)

        const { error: error5 } = await process.wait()
        if (error5 !== undefined)
            throw new MatcherError(error5)
    }

    get exitCode(): number | null {

        if (this.process === undefined)
            throw new MatcherError('The process is not yet spawned')

        return this.process.exitCode
    }

    get pid(): number {

        if (this.process === undefined)
            throw new MatcherError('The process is not yet spawned')

        if (this.process.pid === undefined)
            throw new MatcherError('Cannot access the pid of the process')

        return this.process.pid
    }

    get stdin(): NativeWritable {

        if (this.process === undefined)
            throw new MatcherError('The process is not yet spawned')

        if (this.process.stdin === undefined)
            throw new MatcherError('Cannot access the standard input of the process')

        return this.process.stdin
    }

}

export {
    Executable
}
