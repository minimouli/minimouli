/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'node:fs'
import { File } from '@minimouli/fs'
import { Orchestrator } from './orchestrator.js'
import { configSchema } from './schemas/config.schema.js'
import type { Path } from '@minimouli/fs'
import type { MoulinetteConfig } from '@minimouli/types/config'
import type { ErrorCatcherResponse } from './types/error-catcher-response.type.js'
import type { PlanResponse } from './types/plan-response.type.js'
import type { RunResponse } from './types/run-response.type.js'
import type { WorkerEvents } from './types/worker-events.type.js'

type ReadConfigResponse =
    | {
        config: MoulinetteConfig
        error?: undefined
    }
    | {
        error: string
        config?: undefined
    }

type CheckBinariesResponse =
    | {
        succeed: true
        error?: undefined
    }
    | {
        succeed: false
        error: string
    }

class Runner {

    private orchestrator: Orchestrator | undefined = undefined

    constructor(
        private projectPath: Path,
        private moulinettePath: Path
    ) {}

    on<E extends keyof WorkerEvents>(event: E, listener: WorkerEvents[E]): void {

        if (this.orchestrator === undefined)
            return

        this.orchestrator.on(event, listener)
    }

    removeListener<E extends keyof WorkerEvents>(event: E, listener: WorkerEvents[E]): void {

        if (this.orchestrator === undefined)
            return

        this.orchestrator.removeListener(event, listener)
    }

    async prepare(): Promise<ErrorCatcherResponse> {

        const { config, error: error1 } = await this.readConfig()
        if (error1 !== undefined)
            return { error: error1 }

        const { error: error2 } = await this.checkBinaries(config.binaries)
        if (error2 !== undefined)
            return { error: error2 }

        const rootDirPath = this.moulinettePath.join(config.rootDir)
        const currentSuite = config.suites.default

        const testsFilePaths = currentSuite.map((testFile) => rootDirPath.join(testFile))
        this.orchestrator = new Orchestrator(testsFilePaths)

        const { error: error3 } = await this.orchestrator.load()
        if (error3 !== undefined)
            return { error: error3 }

        const { error: error4 } = await this.orchestrator.prepare({
            projectPath: this.projectPath.toString(),
            moulinettePath: this.moulinettePath.toString(),
            binaries: config.binaries
        })
        if (error4 !== undefined)
            return { error: error4 }

        return { error: undefined }
    }

    async plan(): Promise<PlanResponse> {

        if (this.orchestrator === undefined)
            return { error: 'The runner must be prepared before', syntheses: undefined }

        return this.orchestrator.plan()
    }

    async run(): Promise<RunResponse> {

        if (this.orchestrator === undefined)
            return { error: 'The runner must be prepared before', syntheses: undefined }

        return this.orchestrator.run()
    }

    terminate(): void {

        if (this.orchestrator === undefined)
            return

        this.orchestrator.terminate()
    }

    private async readConfig(): Promise<ReadConfigResponse> {

        const configFile = new File(this.moulinettePath.join('moulinette.json'))
        const { contents, error: error1 } = await configFile.getContents()

        if (error1 !== undefined || contents === null)
            return { error: 'The moulinette configuration file cannot be read' }

        try {

            const config = JSON.parse(contents.toString()) as MoulinetteConfig
            const { error: error2 } = configSchema.validate(config)

            if (error2 !== undefined)
                return { error: 'The moulinette configuration file is not in an accepted format (validation)' }

            return { config }

        } catch {
            return { error: 'The moulinette configuration file is not in an accepted format (non-json)' }
        }
    }

    private async checkBinaries(binaries: Record<string, string>): Promise<CheckBinariesResponse> {

        const names = Object.keys(binaries)
        const files = Object.values(binaries).map((binary) => new File(this.projectPath.join(binary)))

        const results = await Promise.all(files.map((file) => file.access(fs.constants.F_OK | fs.constants.X_OK)))

        for (const [index, result] of results.entries()) {

            if (result.succeed)
                continue

            return {
                succeed: false,
                error: `The binary file '${names[index]}' is not found, please check if your project is compiled or if the command is executed at the repository root`
            }
        }

        return { succeed: true }
    }

}

export {
    Runner
}
