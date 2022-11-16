/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { CompHint } from './comp.hint.js'
import type { EqualHint } from './equal.hint.js'
import type { MatcherErrorHint } from './matcher-error.hint.js'
import type { StreamDiffHint } from './stream-diff.hint.js'
import type { StringDiffHint } from './string-diff.hint.js'
import type { TimeoutHint } from './timeout.hint.js'

type Hint =
    | CompHint
    | EqualHint
    | MatcherErrorHint
    | StreamDiffHint
    | StringDiffHint
    | TimeoutHint

export * from './comp.hint.js'
export * from './equal.hint.js'
export * from './hint.js'
export * from './matcher-error.hint.js'
export * from './stream-diff.hint.js'
export * from './string-diff.hint.js'
export * from './timeout.hint.js'
export type {
    Hint
}
