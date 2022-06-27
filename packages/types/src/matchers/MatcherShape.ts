/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RawMatcher } from './RawMatcher.js'

interface AndNot<T> {
    not: T
}

type MatcherShape<R> =
    RawMatcher<R>
    & AndNot<RawMatcher<R>>

export type {
    MatcherShape
}
