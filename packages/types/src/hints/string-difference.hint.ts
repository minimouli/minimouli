/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HintBase, HintCategory, HintType, ObjectType } from './hint.js'

interface StringDifferenceHint extends HintBase {
    type: HintType.StringDifference
    category?: HintCategory.Output
    received: {
        value: string[]
        type: ObjectType.String
    }
    expected: {
        value: string[]
        type: ObjectType.String
    }
}

export type {
    StringDifferenceHint
}
