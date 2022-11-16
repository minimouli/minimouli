/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HintBase, HintCategory, HintType } from './hint.js'

interface StreamDiffHint extends HintBase {
    type: HintType.STREAM_DIFF
    category?: HintCategory.OUTPUT
}

export type {
    StreamDiffHint
}
