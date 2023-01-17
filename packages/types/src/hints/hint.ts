/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

enum HintType {
    Comparison = 'HintType.Comparison',
    Equality = 'HintType.Equality',
    StreamDifference = 'HintType.StreamDifference',
    StringDifference = 'HintType.StringDifference',
    Timeout = 'HintType.Timeout',
    MatcherError = 'HintType.MatcherError'
}

enum HintStatus {
    Success = 'Status.Success',
    Failure = 'Status.Failure'
}

enum HintCategory {
    Output = 'Category.Output',
    ExitCode = 'Category.ExitCode',
    Timeout = 'Category.Timeout'
}

enum ObjectType {
    Boolean = 'boolean',
    Number = 'number',
    Object = 'object',
    String = 'string',
    Undefined = 'undefined'
}

interface HintBase {
    type: HintType
    status: HintStatus
    category?: HintCategory
    message?: string
    snippet?: {
        arguments: {
            received: string[]
            expected: string[]
        }
        method: string
    }
}

export {
    HintType,
    HintStatus,
    HintCategory,
    ObjectType
}
export type {
    HintBase
}
