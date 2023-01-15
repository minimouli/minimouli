/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ContextConfig } from '@minimouli/types/config'
import type { Context } from './context.js'
import type { Suite } from '../suite.js'
import type { Test } from '../test.js'
import type { Hook, Trigger } from '../../hooks/hook.js'

class SuiteContext implements Context {

    public readonly tests: Test[] = []
    public readonly suites: Suite[] = []
    private hooks: Hook[] = []
    private currentConfiguration: ContextConfig = {
        attempts: 1
    }

    constructor(
        private parentContext: Context,
        private name: string
    ) {}

    addTest(test: Test): void {
        this.tests.push(test)
    }

    addSuite(suite: Suite): void {
        this.suites.push(suite)
    }

    addHook(hook: Hook): void {
        this.hooks.push(hook)
    }

    setConfiguration(config: Partial<ContextConfig>) {
        this.currentConfiguration = {
            ...this.currentConfiguration,
            ...config
        }
    }

    async execute(): Promise<void> {

        for (const test of this.tests)
            // eslint-disable-next-line no-await-in-loop
            await test.execute(this)

        for (const suite of this.suites)
            // eslint-disable-next-line no-await-in-loop
            await suite.execute()
    }

    async emit(trigger: Trigger, depth = 0): Promise<void> {
        await this.parentContext.emit(trigger, depth + 1)

        for (const hook of this.hooks) {

            if (!hook.isAppliedOnChildren && depth > 0)
                continue

            if (!hook.triggers.includes(trigger))
                continue

            // eslint-disable-next-line no-await-in-loop
            await hook.execute()
        }
    }

    get configuration(): ContextConfig {
        return this.currentConfiguration
    }

    get path(): string[] {
        return [...this.parentContext.path, this.name]
    }

}

export {
    SuiteContext
}
