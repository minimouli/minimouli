/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { performance } from 'node:perf_hooks'
import { HintStatus, HintType } from '@minimouli/types/hints.js'
import { TestStatus } from '@minimouli/types/syntheses.js'
import { FrameworkError } from './errors/FrameworkError.js'
import { Trigger } from './hooks/Hook.js'
import type { Unit } from '@minimouli/types'
import type { TestFn } from '@minimouli/types/blocks.js'
import type { Hint, MatcherErrorHint } from '@minimouli/types/hints.js'
import type { Context } from './tree/contexts/Context.js'

interface ExecuteTestSuccessResponse {
    status: TestStatus.SUCCESS
    hint: undefined
}

interface ExecuteTestFailureResponse {
    status: TestStatus.FAILURE
    hint: Hint
}

type ExecuteTestResponse = ExecuteTestSuccessResponse | ExecuteTestFailureResponse
type ExecuteResponse = ExecuteTestResponse & {
    duration: Unit.ms
}

class TestExecutor {

    constructor(
        private context: Context,
        private fn: TestFn
    ) {}

    private async executeTest(): Promise<ExecuteTestResponse> {

        try {
            await this.fn()
        } catch (error) {

            const hint = error instanceof FrameworkError
                ? error.hint
                : {
                    type: HintType.MATCHER_ERROR,
                    status: HintStatus.FAILURE,
                    message: 'Unknown error returned'
                } as MatcherErrorHint

            return {
                status: TestStatus.FAILURE,
                hint
            }
        }

        return {
            status: TestStatus.SUCCESS,
            hint: undefined
        }
    }

    async execute(): Promise<ExecuteResponse> {

        const startTime = performance.now()

        this.context.emit(Trigger.BEFORE_TEST_IS_EXECUTED)
        const result = await this.executeTest()
        this.context.emit(Trigger.AFTER_TEST_IS_EXECUTED)

        const duration = performance.now() - startTime

        return { ...result, duration }
    }

}

export {
    TestExecutor
}
