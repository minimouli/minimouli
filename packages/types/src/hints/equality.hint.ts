/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HintBase, HintType, ObjectType } from './hint.js'

interface EqualityHint extends HintBase {
    type: HintType.Equality
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
    EqualityHint
}
