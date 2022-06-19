/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { CompHint } from './CompHint.js'
import type { EqualHint } from './EqualHint.js'
import type { MatcherErrorHint } from './MatcherErrorHint.js'
import type { StreamDiffHint } from './StreamDiffHint.js'
import type { StringDiffHint } from './StringDiffHint.js'
import type { TimeoutHint } from './TimeoutHint.js'

type Hint = CompHint | EqualHint | MatcherErrorHint | StreamDiffHint | StringDiffHint | TimeoutHint

export * from './CompHint.js'
export * from './EqualHint.js'
export * from './Hint.js'
export * from './MatcherErrorHint.js'
export * from './StreamDiffHint.js'
export * from './StringDiffHint.js'
export * from './TimeoutHint.js'
export type {
    Hint
}
