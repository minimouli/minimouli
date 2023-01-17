/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ComparisonHint } from './comparison.hint.js'
import type { EqualityHint } from './equality.hint.js'
import type { MatcherErrorHint } from './matcher-error.hint.js'
import type { StreamDifferenceHint } from './stream-difference.hint.js'
import type { StringDifferenceHint } from './string-difference.hint.js'
import type { TimeoutHint } from './timeout.hint.js'

type Hint =
    | ComparisonHint
    | EqualityHint
    | MatcherErrorHint
    | StreamDifferenceHint
    | StringDifferenceHint
    | TimeoutHint

export * from './comparison.hint.js'
export * from './equality.hint.js'
export * from './hint.js'
export * from './matcher-error.hint.js'
export * from './stream-difference.hint.js'
export * from './string-difference.hint.js'
export * from './timeout.hint.js'
export type {
    Hint
}
