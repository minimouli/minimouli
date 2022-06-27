/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { IPath } from '../objects'
import type { MatcherOutputOptions } from '../options'

interface RawMatcher<R> {

    toBe(expected: R): void

    toBeTruthy(): void

    toBeFalsy(): void

    toBeNull(): void

    toBeDefined(): void

    toBeUndefined(): void

    toBeNaN(): void

    toBeLessThan(expected: number): void

    toBeLessThanOrEqual(expected: number): void

    toBeGreaterThan(expected: number): void

    toBeGreaterThanOrEqual(expected: number): void

    toExitWith(expected: number): void

    toOutput(expected: string[] | IPath, options?: Partial<MatcherOutputOptions>): Promise<void>

}

export type {
    RawMatcher
}
