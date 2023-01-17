/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HintStatus, HintType, ObjectType } from '@minimouli/types/hints'
import { assertToBe, assertToBeFalsy, assertToBeTruthy } from '../helpers/assert.helper.js'
import type { EqualityHint, MatcherErrorHint } from '@minimouli/types/hints'
import type { Matcher } from '@minimouli/types/matchers'
import type { PathInterface } from '@minimouli/types/interfaces'
import type { MatcherOutputOptions } from '@minimouli/types/options'

class BooleanMatcher implements Matcher<boolean> {

    toBe(received: boolean, expected: boolean): EqualityHint {

        const pass = assertToBe(received, expected)

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.Boolean
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

    toBeTruthy(received: boolean): EqualityHint {

        const pass = assertToBeTruthy(received)

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
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

    toBeFalsy(received: boolean): EqualityHint {

        const pass = assertToBeFalsy(received)

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
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

    toBeNull(received: boolean): EqualityHint {
        return {
            type: HintType.Equality,
            status: HintStatus.Failure,
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
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

    toBeDefined(received: boolean): EqualityHint {
        return {
            type: HintType.Equality,
            status: HintStatus.Success,
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
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

    toBeUndefined(received: boolean): EqualityHint {
        return {
            type: HintType.Equality,
            status: HintStatus.Failure,
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
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
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be an executable',
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
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

    toOutput(received: boolean, expected: string[] | PathInterface, options: Partial<MatcherOutputOptions>): Promise<MatcherErrorHint> {
        void expected
        void options

        return Promise.resolve({
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be an executable',
            received: {
                value: received.toString(),
                type: ObjectType.Boolean
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
