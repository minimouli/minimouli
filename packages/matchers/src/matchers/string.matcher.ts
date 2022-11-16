/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HintStatus, HintType, ObjectType } from '@minimouli/types/hints'
import { assertToBe, assertToBeFalsy, assertToBeTruthy } from '../helpers/assert.helper.js'
import type { EqualHint, MatcherErrorHint, StringDiffHint } from '@minimouli/types/hints'
import type { Matcher } from '@minimouli/types/matchers'
import type { PathInterface } from '@minimouli/types/interfaces'
import type { MatcherOutputOptions } from '@minimouli/types/options'

class StringMatcher implements Matcher<string> {

    toBe(received: string, expected: string): StringDiffHint {

        const pass = assertToBe(received, expected)

        return {
            type: HintType.STRING_DIFF,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: received.split('\n'),
                type: ObjectType.STRING
            },
            expected: {
                value: expected.split('\n'),
                type: ObjectType.STRING
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

    toBeTruthy(received: string): EqualHint {

        const pass = assertToBeTruthy(received)

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: received,
                type: ObjectType.STRING
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

    toBeFalsy(received: string): EqualHint {

        const pass = assertToBeFalsy(received)

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: received,
                type: ObjectType.STRING
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

    toBeNull(received: string): EqualHint {
        return {
            type: HintType.EQUAL,
            status: HintStatus.FAILURE,
            received: {
                value: received,
                type: ObjectType.STRING
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

    toBeDefined(received: string): EqualHint {
        return {
            type: HintType.EQUAL,
            status: HintStatus.SUCCESS,
            received: {
                value: received,
                type: ObjectType.STRING
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

    toBeUndefined(received: string): EqualHint {
        return {
            type: HintType.EQUAL,
            status: HintStatus.FAILURE,
            received: {
                value: received,
                type: ObjectType.STRING
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

    toBeNaN(received: string): MatcherErrorHint {
        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: received,
                type: ObjectType.STRING
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

    toBeLessThan(received: string, expected: number): MatcherErrorHint {
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: received,
                type: ObjectType.STRING
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

    toBeLessThanOrEqual(received: string, expected: number): MatcherErrorHint {
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: received,
                type: ObjectType.STRING
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

    toBeGreaterThan(received: string, expected: number): MatcherErrorHint {
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: received,
                type: ObjectType.STRING
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

    toBeGreaterThanOrEqual(received: string, expected: number): MatcherErrorHint {
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: received,
                type: ObjectType.STRING
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

    toExitWith(received: string, expected: number): MatcherErrorHint {
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be an executable',
            received: {
                value: received,
                type: ObjectType.STRING
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

    toOutput(received: string, expected: string[] | PathInterface, options: Partial<MatcherOutputOptions>): Promise<MatcherErrorHint> {
        void expected
        void options

        return Promise.resolve({
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be an executable',
            received: {
                value: received,
                type: ObjectType.STRING
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
    StringMatcher
}
