/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HintStatus, HintType, ObjectType } from '@minimouli/types/hints.js'
import { assertToBeFalsy, assertToBeNull, assertToBeTruthy, assertToEqual } from '../helpers/assert.helper.js'
import type { EqualHint, MatcherErrorHint } from '@minimouli/types/hints.js'
import type { Matcher } from '@minimouli/types/matchers.js'
import type { IPath } from '@minimouli/types/objects.js'
import type { MatcherOutputOptions } from '@minimouli/types/options.js'

class ObjectMatcher implements Matcher<object | null> {

    toBe(received: object | null, expected: object | null): EqualHint {

        const pass = assertToEqual(received, expected)

        const isReceivedNull = received === null
        const isExpectedNull = expected === null

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: isReceivedNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            expected: {
                value: isExpectedNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected']
                },
                method: 'toBe'
            }
        }
    }

    toBeTruthy(received: object | null): EqualHint {

        const pass = assertToBeTruthy(received)
        const isNull = received === null

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: []
                },
                method: 'toBeTruthy'
            }
        }
    }

    toBeFalsy(received: object | null): EqualHint {

        const pass = assertToBeFalsy(received)
        const isNull = received === null

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: []
                },
                method: 'toBeFalsy'
            }
        }
    }

    toBeNull(received: object | null): EqualHint {

        const pass = assertToBeNull(received)

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: pass ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: []
                },
                method: 'toBeNull'
            }
        }
    }

    toBeDefined(received: object | null): EqualHint {

        const isNull = received === null

        return {
            type: HintType.EQUAL,
            status: HintStatus.SUCCESS,
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: []
                },
                method: 'toBeDefined'
            }
        }
    }

    toBeUndefined(received: object | null): EqualHint {

        const isNull = received === null

        return {
            type: HintType.EQUAL,
            status: HintStatus.FAILURE,
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: []
                },
                method: 'toBeUndefined'
            }
        }
    }

    toBeNaN(received: object | null): MatcherErrorHint {

        const isNull = received === null

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: []
                },
                method: 'toBeNaN'
            }
        }
    }

    toBeLessThan(received: object | null, expected: number): MatcherErrorHint {
        void expected

        const isNull = received === null

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected']
                },
                method: 'toBeLessThan'
            }
        }
    }

    toBeLessThanOrEqual(received: object | null, expected: number): MatcherErrorHint {
        void expected

        const isNull = received === null

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected']
                },
                method: 'toBeLessThanOrEqual'
            }
        }
    }

    toBeGreaterThan(received: object | null, expected: number): MatcherErrorHint {
        void expected

        const isNull = received === null

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected']
                },
                method: 'toBeGreaterThan'
            }
        }
    }

    toBeGreaterThanOrEqual(received: object | null, expected: number): MatcherErrorHint {
        void expected

        const isNull = received === null

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected']
                },
                method: 'toBeGreaterThanOrEqual'
            }
        }
    }

    toExitWith(received: object | null, expected: number): MatcherErrorHint {
        void expected

        const isNull = received === null

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be an executable',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected']
                },
                method: 'toExitWith'
            }
        }
    }

    toOutput(received: object | null, expected: string[] | IPath, options: Partial<MatcherOutputOptions>): Promise<MatcherErrorHint> {
        void expected
        void options

        const isNull = received === null

        return Promise.resolve({
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be an executable',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.OBJECT
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected', 'options']
                },
                method: 'toOutput'
            }
        })
    }

}

export {
    ObjectMatcher
}
