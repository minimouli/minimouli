/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Suite } from '../suite.js'
import type { Test } from '../test.js'
import type { Hook, Trigger } from '../../hooks/hook.js'

interface Context {

    addTest(test: Test): void
    addSuite(suite: Suite): void
    addHook(hook: Hook): void

    execute(): Promise<void>
    emit(trigger: Trigger, depth?: number): Promise<void>

    get tests(): Test[]
    get suites(): Suite[]
    get path(): string[]

}

export type {
    Context
}
