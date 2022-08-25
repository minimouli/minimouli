/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Worker } from './Worker.js'
import type { Path } from '@minimouli/fs'
import type { MoulinetteConfig } from '@minimouli/types/config.js'
import type { SuiteSynthesis } from '@minimouli/types/syntheses.js'
import type { ErrorCatcherResponse } from './types/ErrorCatcherResponse.js'
import type { RunResponse } from './types/RunResponse.js'

class Orchestrator {

    private readonly workers: Worker[]

    constructor(testsFilePaths: Path[]) {
        this.workers = testsFilePaths.map((testsFilePath) => new Worker(testsFilePath))
    }

    async load(): Promise<ErrorCatcherResponse> {

        const results = await Promise.all(this.workers.map((worker) => worker.load()))

        for (const result of results)
            if (result.error !== undefined)
                return { error: 'At least one worker cannot spawn a child process from the tests file' }

        return { error: undefined }
    }

    async prepare(config: MoulinetteConfig): Promise<ErrorCatcherResponse> {

        const results = await Promise.all(this.workers.map((worker) => worker.prepare(config)))

        for (const result of results)
            if (result.error !== undefined)
                return { error: 'At least one worker cannot being prepared' }

        return { error: undefined }
    }

    async run(): Promise<RunResponse> {

        let syntheses: SuiteSynthesis[] = []

        for (const worker of this.workers) {

            // eslint-disable-next-line no-await-in-loop
            const { syntheses: currentSyntheses, error } = await worker.run()

            if (error !== undefined)
                return { error: 'At least one worker is impossible to use', syntheses: undefined }

            syntheses = [...syntheses, ...currentSyntheses]
        }

        return { syntheses, error: undefined }
    }

    terminate(): void {
        for (const worker of this.workers)
            worker.terminate()
    }

}

export {
    Orchestrator
}

