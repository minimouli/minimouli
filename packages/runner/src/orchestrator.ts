/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Worker } from './worker.js'
import type { Path } from '@minimouli/fs'
import type { MoulinetteConfig } from '@minimouli/types/config'
import type { SuiteSynthesis, SuitePlanSynthesis } from '@minimouli/types/syntheses'
import type { ErrorCatcherResponse } from './types/error-catcher-response.type.js'
import type { PlanResponse } from './types/plan-response.type.js'
import type { RunResponse } from './types/run-response.type.js'
import type { WorkerEvents } from './types/worker-events.type.js'

class Orchestrator {

    private readonly workers: Worker[]

    constructor(testsFilePaths: Path[]) {
        this.workers = testsFilePaths.map((testsFilePath, index) => new Worker(index, testsFilePath))
    }

    on<E extends keyof WorkerEvents>(event: E, listener: WorkerEvents[E]): void {
        for (const worker of this.workers)
            worker.on(event, listener)
    }

    removeListener<E extends keyof WorkerEvents>(event: E, listener: WorkerEvents[E]): void {
        for (const worker of this.workers)
            worker.removeListener(event, listener)
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

    async plan(): Promise<PlanResponse> {

        let syntheses: SuitePlanSynthesis[] = []
        const results = await Promise.all(this.workers.map((worker) => worker.plan()))

        for (const result of results) {

            if (result.error !== undefined)
                return { error: 'At least one worker is impossible to use' }

            syntheses = [...syntheses, ...result.syntheses]
        }

        return { syntheses }
    }

    async run(): Promise<RunResponse> {

        let syntheses: SuiteSynthesis[] = []

        for (const worker of this.workers) {

            // eslint-disable-next-line no-await-in-loop
            const { syntheses: currentSyntheses, error } = await worker.run()

            if (error !== undefined)
                return { error: 'At least one worker is impossible to use' }

            syntheses = [...syntheses, ...currentSyntheses]
        }

        return { syntheses }
    }

    terminate(): void {
        for (const worker of this.workers)
            worker.terminate()
    }

}

export {
    Orchestrator
}

