/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Context } from './context.js'
import type { Suite } from '../suite.js'
import type { Test } from '../test.js'
import type { Hook } from '../../hooks/hook.js'

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

    emit(): Promise<void> {
        return Promise.resolve()
    }

    get path(): string[] {
        return []
    }

}

export {
    GlobalContext
}
