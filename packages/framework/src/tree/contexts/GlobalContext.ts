/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Context } from './Context.js'
import type { Suite } from '../Suite.js'
import type { Test } from '../Test.js'
import type { Hook, Trigger } from '../../hooks/Hook.js'

class GlobalContext implements Context {

    public readonly tests: Test[] = []
    public readonly suites: Suite[] = []

    addSuite(suite: Suite): void {
        this.suites.push(suite)
    }

    addTest(test: Test): void {
        void test
        throw new Error('Cannot add test inside global context. Use a suite block first')
    }

    addHook(hook: Hook): void {
        void hook
        throw new Error('Cannot add hook inside global context. Use a suite block first')
    }

    async execute(): Promise<void> {
        for (const suite of this.suites)
            // eslint-disable-next-line no-await-in-loop
            await suite.execute()
    }

    emit(trigger: Trigger): void {
        void trigger
    }

}

export {
    GlobalContext
}
