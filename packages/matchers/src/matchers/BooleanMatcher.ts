/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HintStatus, HintType, ObjectType } from '@minimouli/types/hints'
import { assertToBe, assertToBeFalsy, assertToBeTruthy } from '../helpers/assert.helper.js'
import type { EqualHint, MatcherErrorHint } from '@minimouli/types/hints'
import type { Matcher } from '@minimouli/types/matchers'
import type { IPath } from '@minimouli/types/objects'
import type { MatcherOutputOptions } from '@minimouli/types/options'

class BooleanMatcher implements Matcher<boolean> {

    toBe(received: boolean, expected: boolean): EqualHint {

        const pass = assertToBe(received, expected)

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.BOOLEAN
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

    toBeTruthy(received: boolean): EqualHint {

        const pass = assertToBeTruthy(received)

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
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

    toBeFalsy(received: boolean): EqualHint {

        const pass = assertToBeFalsy(received)

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
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

    toBeNull(received: boolean): EqualHint {
        return {
            type: HintType.EQUAL,
            status: HintStatus.FAILURE,
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
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

    toBeDefined(received: boolean): EqualHint {
        return {
            type: HintType.EQUAL,
            status: HintStatus.SUCCESS,
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
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

    toBeUndefined(received: boolean): EqualHint {
        return {
            type: HintType.EQUAL,
            status: HintStatus.FAILURE,
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
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

    toBeNaN(received: boolean): MatcherErrorHint {
        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
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

    toBeLessThan(received: boolean, expected: number): MatcherErrorHint {
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
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

    toBeLessThanOrEqual(received: boolean, expected: number): MatcherErrorHint {
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
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

    toBeGreaterThan(received: boolean, expected: number): MatcherErrorHint {
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
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

    toBeGreaterThanOrEqual(received: boolean, expected: number): MatcherErrorHint {
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
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

    toExitWith(received: boolean, expected: number): MatcherErrorHint {
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be an executable',
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
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

    toOutput(received: boolean, expected: string[] | IPath, options: Partial<MatcherOutputOptions>): Promise<MatcherErrorHint> {
        void expected
        void options

        return Promise.resolve({
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be an executable',
            received: {
                value: received.toString(),
                type: ObjectType.BOOLEAN
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
    BooleanMatcher
}
