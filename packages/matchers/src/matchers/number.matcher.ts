/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ComparisonSymbol, HintStatus, HintType, ObjectType } from '@minimouli/types/hints'
import { assert, assertToBe, assertToBeFalsy, assertToBeNaN, assertToBeTruthy } from '../helpers/assert.helper.js'
import type { ComparisonHint, EqualityHint, MatcherErrorHint } from '@minimouli/types/hints'
import type { Matcher } from '@minimouli/types/matchers'
import type { PathInterface } from '@minimouli/types/interfaces'
import type { MatcherOutputOptions } from '@minimouli/types/options'

class NumberMatcher implements Matcher<number> {

    toBe(received: number, expected: number): EqualityHint {

        const pass = assertToBe(received, expected)

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: received.toString(),
                type: ObjectType.Number
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.Number
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

    toBeTruthy(received: number): EqualityHint {

        const pass = assertToBeTruthy(received)

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: received.toString(),
                type: ObjectType.Number
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

    toBeFalsy(received: number): EqualityHint {

        const pass = assertToBeFalsy(received)

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: received.toString(),
                type: ObjectType.Number
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

    toBeNull(received: number): EqualityHint {
        return {
            type: HintType.Equality,
            status: HintStatus.Failure,
            received: {
                value: received.toString(),
                type: ObjectType.Number
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

    toBeDefined(received: number): EqualityHint {
        return {
            type: HintType.Equality,
            status: HintStatus.Success,
            received: {
                value: received.toString(),
                type: ObjectType.Number
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

    toBeUndefined(received: number): EqualityHint {
        return {
            type: HintType.Equality,
            status: HintStatus.Failure,
            received: {
                value: received.toString(),
                type: ObjectType.Number
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

    toBeNaN(received: number): EqualityHint {

        const pass = assertToBeNaN(received)

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: received.toString(),
                type: ObjectType.Number
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

    toBeLessThan(received: number, expected: number): ComparisonHint {

        const pass = assert(received < expected)

        return {
            type: HintType.Comparison,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            symbol: ComparisonSymbol.LessThan,
            received: {
                value: received.toString(),
                type: ObjectType.Number
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.Number
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

    toBeLessThanOrEqual(received: number, expected: number): ComparisonHint {

        const pass = assert(received <= expected)

        return {
            type: HintType.Comparison,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            symbol: ComparisonSymbol.LessThanOrEqual,
            received: {
                value: received.toString(),
                type: ObjectType.Number
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.Number
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

    toBeGreaterThan(received: number, expected: number): ComparisonHint {

        const pass = assert(received > expected)

        return {
            type: HintType.Comparison,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            symbol: ComparisonSymbol.GreaterThan,
            received: {
                value: received.toString(),
                type: ObjectType.Number
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.Number
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

    toBeGreaterThanOrEqual(received: number, expected: number): ComparisonHint {

        const pass = assert(received >= expected)

        return {
            type: HintType.Comparison,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            symbol: ComparisonSymbol.GreaterThanOrEqual,
            received: {
                value: received.toString(),
                type: ObjectType.Number
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.Number
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be an executable',
            received: {
                value: received.toString(),
                type: ObjectType.Number
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

    toOutput(received: number, expected: string[] | PathInterface, options: Partial<MatcherOutputOptions>): Promise<MatcherErrorHint> {
        void expected
        void options

        return Promise.resolve({
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be an executable',
            received: {
                value: received.toString(),
                type: ObjectType.Number
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
