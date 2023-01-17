/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Channel } from '@minimouli/ipc'
import { TestStatus } from '@minimouli/types/syntheses'
import { TextExecutor } from '../text-executor.js'
import type { EventDescriptions } from '@minimouli/ipc'
import type { Unit } from '@minimouli/types'
import type { TestFn } from '@minimouli/types/blocks'
import type { Hint } from '@minimouli/types/hints'
import type { TestSynthesis } from '@minimouli/types/syntheses'
import type { SuiteContext } from './contexts/suite.context.js'

interface IssuedEvents extends EventDescriptions {
    'test:perform': [string, string[]]
    'test:complete': [string, string[], TestStatus, Unit.ms]
}

class Test {

    private status: TestStatus = TestStatus.Undefined
    private hint: Hint | undefined = undefined
    private duration: Unit.ms = Number.NaN

    constructor(
        public readonly name: string,
        public readonly path: string[],
        private fn: TestFn
    ) {}

    async execute(context: SuiteContext): Promise<void> {

        const executor = new TextExecutor(context, this.fn)
        const channel = Channel.fromCurrentProcess<IssuedEvents, EventDescriptions>()

        channel.emit('test:launched', this.name, this.path)
        const { status, hint, duration } = await executor.execute()
        channel.emit('test:completed', this.name, this.path, status, duration)

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
