/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { performance } from 'node:perf_hooks'
import { HintStatus, HintType } from '@minimouli/types/hints'
import { TestStatus } from '@minimouli/types/syntheses'
import { FrameworkError } from './errors/framework.error.js'
import { Trigger } from './hooks/hook.js'
import type { Unit } from '@minimouli/types'
import type { TestFn } from '@minimouli/types/blocks'
import type { Hint, MatcherErrorHint } from '@minimouli/types/hints'
import type { Context } from './tree/contexts/context.js'

type ExecuteTestResponse =
    | {
        status: TestStatus.Success
        hint?: undefined
    }
    | {
        status: TestStatus.Failure
        hint: Hint
    }

type ExecuteResponse = ExecuteTestResponse & {
    duration: Unit.ms
}

class TextExecutor {

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
                    type: HintType.MatcherError,
                    status: HintStatus.Failure,
                    message: 'Unknown error returned'
                } as MatcherErrorHint

            return {
                status: TestStatus.Failure,
                hint
            }
        }

        return {
            status: TestStatus.Success,
            hint: undefined
        }
    }

    private async executeAttempt(): Promise<ExecuteTestResponse> {

        let result: ExecuteTestResponse
        let { attempts } = this.context.configuration

        do {

            /* eslint-disable no-await-in-loop */
            await this.context.emit(Trigger.BEFORE_TEST_IS_EXECUTED)
            result = await this.executeTest()
            await this.context.emit(Trigger.AFTER_TEST_IS_EXECUTED)
            /* eslint-enable no-await-in-loop */

            if (result.status === TestStatus.Success)
                return result

        } while (--attempts > 0)

        return result
    }

    async execute(): Promise<ExecuteResponse> {

        const startTime = performance.now()
        const result = await this.executeAttempt()
        const duration = performance.now() - startTime

        return { ...result, duration }
    }

}

export {
    TextExecutor
}
