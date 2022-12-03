/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HintStatus, HintType, ObjectType } from '@minimouli/types/hints'
import { assertToBeFalsy, assertToBeNull, assertToBeTruthy, assertToEqual } from '../helpers/assert.helper.js'
import type { EqualityHint, MatcherErrorHint } from '@minimouli/types/hints'
import type { Matcher } from '@minimouli/types/matchers'
import type { PathInterface } from '@minimouli/types/interfaces'
import type { MatcherOutputOptions } from '@minimouli/types/options'

class ObjectMatcher implements Matcher<object | null> {

    toBe(received: object | null, expected: object | null): EqualityHint {

        const pass = assertToEqual(received, expected)

        const isReceivedNull = received === null
        const isExpectedNull = expected === null

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: isReceivedNull ? 'null' : 'object',
                type: ObjectType.Object
            },
            expected: {
                value: isExpectedNull ? 'null' : 'object',
                type: ObjectType.Object
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

    toBeTruthy(received: object | null): EqualityHint {

        const pass = assertToBeTruthy(received)
        const isNull = received === null

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.Object
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

    toBeFalsy(received: object | null): EqualityHint {

        const pass = assertToBeFalsy(received)
        const isNull = received === null

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.Object
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

    toBeNull(received: object | null): EqualityHint {

        const pass = assertToBeNull(received)

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: pass ? 'null' : 'object',
                type: ObjectType.Object
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

    toBeDefined(received: object | null): EqualityHint {

        const isNull = received === null

        return {
            type: HintType.Equality,
            status: HintStatus.Success,
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.Object
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

    toBeUndefined(received: object | null): EqualityHint {

        const isNull = received === null

        return {
            type: HintType.Equality,
            status: HintStatus.Failure,
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.Object
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.Object
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.Object
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.Object
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.Object
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.Object
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be an executable',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.Object
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

    toOutput(received: object | null, expected: string[] | PathInterface, options: Partial<MatcherOutputOptions>): Promise<MatcherErrorHint> {
        void expected
        void options

        const isNull = received === null

        return Promise.resolve({
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be an executable',
            received: {
                value: isNull ? 'null' : 'object',
                type: ObjectType.Object
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
