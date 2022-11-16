/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { MatcherShape } from '../matchers/index.js'
import type { ms } from '../unit.js'

type BlockFn = () => void
type ConcurrentBlockFn = () => Promise<void>

type SuiteFn = BlockFn
type TestFn = ConcurrentBlockFn | BlockFn
type HookFn = BlockFn

type Suite = (name: string, fn: SuiteFn) => void
type Test = (name: string, fn: TestFn) => void
type Hook = (fn: HookFn) => void
type Sleep = (duration: ms) => Promise<void>
type Expect = <R = unknown>(received: R) => MatcherShape<R>

export type {
    BlockFn,
    ConcurrentBlockFn,
    SuiteFn,
    TestFn,
    HookFn,
    Suite,
    Test,
    Hook,
    Sleep,
    Expect
}
