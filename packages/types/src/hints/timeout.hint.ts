/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HintBase, HintCategory, HintType } from './hint.js'
import type { ms } from '../unit.js'

interface TimeoutHint extends HintBase {
    type: HintType.Timeout
    category?: HintCategory.Timeout
    timeout: ms
}

export type {
    TimeoutHint
}
