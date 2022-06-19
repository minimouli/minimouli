/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HintBase, HintType, ObjectType } from './Hint.js'

interface EqualHint extends HintBase {
    type: HintType.EQUAL
    received: {
        value: string
        type: ObjectType
    }
    expected?: {
        value: string
        type: ObjectType
    }
}

export type {
    EqualHint
}
