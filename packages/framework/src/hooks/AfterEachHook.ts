/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Trigger } from './Hook.js'
import type { Hook } from './Hook.js'
import type { HookFn } from '@minimouli/types/blocks.js'

class AfterEachHook implements Hook {

    public readonly triggers = [
        Trigger.AFTER_TEST_IS_EXECUTED
    ]
    public readonly isAppliedOnChildren = true

    constructor(
        private fn: HookFn
    ) {}

    execute(): void {
        this.fn()
    }

}

export {
    AfterEachHook
}
