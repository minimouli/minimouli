/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CompSymbol, HintStatus, HintType, ObjectType } from '@minimouli/types/hints'
import { assert, assertToBe, assertToBeFalsy, assertToBeNaN, assertToBeTruthy } from '../helpers/assert.helper.js'
import type { CompHint, EqualHint, MatcherErrorHint } from '@minimouli/types/hints'
import type { Matcher } from '@minimouli/types/matchers'
import type { IPath } from '@minimouli/types/objects'
import type { MatcherOutputOptions } from '@minimouli/types/options'

class NumberMatcher implements Matcher<number> {

    toBe(received: number, expected: number): EqualHint {

        const pass = assertToBe(received, expected)

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.NUMBER
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

    toBeTruthy(received: number): EqualHint {

        const pass = assertToBeTruthy(received)

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
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

    toBeFalsy(received: number): EqualHint {

        const pass = assertToBeFalsy(received)

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
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

    toBeNull(received: number): EqualHint {
        return {
            type: HintType.EQUAL,
            status: HintStatus.FAILURE,
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
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

    toBeDefined(received: number): EqualHint {
        return {
            type: HintType.EQUAL,
            status: HintStatus.SUCCESS,
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
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

    toBeUndefined(received: number): EqualHint {
        return {
            type: HintType.EQUAL,
            status: HintStatus.FAILURE,
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
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

    toBeNaN(received: number): EqualHint {

        const pass = assertToBeNaN(received)

        return {
            type: HintType.EQUAL,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
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

    toBeLessThan(received: number, expected: number): CompHint {

        const pass = assert(received < expected)

        return {
            type: HintType.COMP,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            symbol: CompSymbol.LESS_THAN,
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.NUMBER
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

    toBeLessThanOrEqual(received: number, expected: number): CompHint {

        const pass = assert(received <= expected)

        return {
            type: HintType.COMP,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            symbol: CompSymbol.LESS_THAN_OR_EQUAL,
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.NUMBER
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

    toBeGreaterThan(received: number, expected: number): CompHint {

        const pass = assert(received > expected)

        return {
            type: HintType.COMP,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            symbol: CompSymbol.GREATER_THAN,
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.NUMBER
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

    toBeGreaterThanOrEqual(received: number, expected: number): CompHint {

        const pass = assert(received >= expected)

        return {
            type: HintType.COMP,
            status: pass ? HintStatus.SUCCESS : HintStatus.FAILURE,
            symbol: CompSymbol.GREATER_THAN_OR_EQUAL,
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.NUMBER
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

    toExitWith(received: number, expected: number): MatcherErrorHint {
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be an executable',
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
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

    toOutput(received: number, expected: string[] | IPath, options: Partial<MatcherOutputOptions>): Promise<MatcherErrorHint> {
        void expected
        void options

        return Promise.resolve({
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be an executable',
            received: {
                value: received.toString(),
                type: ObjectType.NUMBER
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
    NumberMatcher
}
