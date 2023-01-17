/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HintBase, HintStatus, HintType, ObjectType } from './hint.js'

interface MatcherErrorHint extends HintBase {
    type: HintType.MatcherError
    status: HintStatus.Failure
    message: string
    received?: {
        value: string
        type: ObjectType
    }
}

export type {
    MatcherErrorHint
}
