/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HintBase, HintCategory, HintType } from './hint.js'

interface StreamDifferenceHint extends HintBase {
    type: HintType.StreamDifference
    category?: HintCategory.Output
}

export type {
    StreamDifferenceHint
}
