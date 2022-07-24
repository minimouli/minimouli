/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TestStatus } from '@minimouli/types/syntheses.js'
import { TestExecutor } from '../TestExecutor.js'
import type { Unit } from '@minimouli/types'
import type { TestFn } from '@minimouli/types/blocks.js'
import type { Hint } from '@minimouli/types/hints.js'
import type { TestSynthesis } from '@minimouli/types/syntheses.js'
import type { SuiteContext } from './contexts/SuiteContext.js'

class Test {

    private status: TestStatus = TestStatus.UNDEFINED
    private hint: Hint | undefined = undefined
    private duration: Unit.ms = Number.NaN

    constructor(
        public readonly name: string,
        private fn: TestFn
    ) {}

    async execute(context: SuiteContext): Promise<void> {

        const executor = new TestExecutor(context, this.fn)
        const { status, hint, duration } = await executor.execute()

        this.status = status
        this.hint = hint
        this.duration = duration
    }

    synthesize(): TestSynthesis {
        return {
            name: this.name,
            status: this.status,
            hint: this.hint,
            duration: this.duration
        }
    }

}

export {
    Test
}
