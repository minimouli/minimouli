/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Trigger } from '../hooks/hook.js'
import type { SuiteSynthesis, SuitePlanSynthesis } from '@minimouli/types/syntheses'
import type { Context } from './contexts/context.js'

class Suite {

    constructor(
        public readonly context: Context,
        public readonly name: string
    ) {}

    async execute(): Promise<void> {
        this.context.emit(Trigger.BEFORE_SUITE_IS_EXECUTED)
        await this.context.execute()
        this.context.emit(Trigger.AFTER_SUITE_IS_EXECUTED)
    }

    plan(): SuitePlanSynthesis {
        return {
            name: this.name,
            tests: this.context.tests.map((test) => test.name),
            suites: this.context.suites.map((suite) => suite.plan())
        }
    }

    synthesize(): SuiteSynthesis {
        return {
            name: this.name,
            tests: this.context.tests.map((test) => test.synthesize()),
            suites: this.context.suites.map((suite) => suite.synthesize())
        }
    }

}

export {
    Suite
}
