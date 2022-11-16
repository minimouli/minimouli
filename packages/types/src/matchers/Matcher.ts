/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Hint } from '../hints/index.js'
import type { IPath } from '../objects/index.js'
import type { MatcherOutputOptions } from '../options/index.js'

interface Matcher<R> {

    toBe(received: R, expected: R): Hint

    toBeTruthy(received: R): Hint

    toBeFalsy(received: R): Hint

    toBeNull(received: R): Hint

    toBeDefined(received: R): Hint

    toBeUndefined(received: R): Hint

    toBeNaN(received: R): Hint

    toBeLessThan(received: R, expected: number): Hint

    toBeLessThanOrEqual(received: R, expected: number): Hint

    toBeGreaterThan(received: R, expected: number): Hint

    toBeGreaterThanOrEqual(received: R, expected: number): Hint

    toExitWith(received: R, expected: number): Hint

    toOutput(received: R, expected: string[] | IPath, options: Partial<MatcherOutputOptions>): Promise<Hint>

}

export type {
    Matcher
}
