/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

enum HintType {
    COMP = 'Hint.COMP',
    EQUAL = 'Hint.EQUAL',
    STREAM_DIFF = 'Hint.STREAM.DIFF',
    STRING_DIFF = 'Hint.STRING_DIFF',
    TIMEOUT = 'Hint.TIMEOUT',
    MATCHER_ERROR = 'Hint.MATCHER_ERROR'
}

enum HintStatus {
    SUCCESS = 'Status.SUCCESS',
    FAILURE = 'Status.FAILURE'
}

enum HintCategory {
    OUTPUT = 'Category.OUTPUT',
    EXIT_CODE = 'Category.EXIT_CODE',
    TIMEOUT = 'Category.TIMEOUT'
}

enum ObjectType {
    BOOLEAN = 'boolean',
    NUMBER = 'number',
    OBJECT = 'object',
    STRING = 'string',
    UNDEFINED = 'undefined'
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
