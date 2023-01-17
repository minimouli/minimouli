/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HintBase, HintType, ObjectType } from './hint.js'

enum ComparisonSymbol {
    LessThan = '<',
    LessThanOrEqual = '<=',
    GreaterThan = '>',
    GreaterThanOrEqual = '>='
}

interface ComparisonHint extends HintBase {
    type: HintType.Comparison

    symbol: ComparisonSymbol
    received: {
        value: string
        type: ObjectType.Number
    }
    expected: {
        value: string
        type: ObjectType.Number
    }
}

export {
    ComparisonSymbol
}
export type {
    ComparisonHint
}
