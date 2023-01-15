/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ContextConfig } from '@minimouli/types/config'
import type { Suite } from '../suite.js'
import type { Test } from '../test.js'
import type { Hook, Trigger } from '../../hooks/hook.js'

interface Context {

    addTest(test: Test): void
    addSuite(suite: Suite): void
    addHook(hook: Hook): void
    setConfiguration(configuration: Partial<ContextConfig>): void

    execute(): Promise<void>
    emit(trigger: Trigger, depth?: number): Promise<void>

    get tests(): Test[]
    get suites(): Suite[]
    get configuration(): ContextConfig
    get path(): string[]

}

export type {
    Context
}
