/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-meaningless-void-operator */

import { HintStatus, HintType, ObjectType } from '@minimouli/types/hints'
import type { EqualHint, MatcherErrorHint } from '@minimouli/types/hints'
import type { Matcher } from '@minimouli/types/matchers'
import type { IPath } from '@minimouli/types/objects'
import type { MatcherOutputOptions } from '@minimouli/types/options'

class UndefinedMatcher implements Matcher<undefined> {

    toBe(received: undefined, expected: undefined): EqualHint {
        void received
        void expected

        return {
            type: HintType.EQUAL,
            status: HintStatus.SUCCESS,
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
            },
            expected: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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

    toBeTruthy(received: undefined): EqualHint {
        void received

        return {
            type: HintType.EQUAL,
            status: HintStatus.FAILURE,
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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

    toBeFalsy(received: undefined): EqualHint {
        void received

        return {
            type: HintType.EQUAL,
            status: HintStatus.SUCCESS,
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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

    toBeNull(received: undefined): EqualHint {
        void received

        return {
            type: HintType.EQUAL,
            status: HintStatus.FAILURE,
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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

    toBeDefined(received: undefined): EqualHint {
        void received

        return {
            type: HintType.EQUAL,
            status: HintStatus.FAILURE,
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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

    toBeUndefined(received: undefined): EqualHint {
        void received

        return {
            type: HintType.EQUAL,
            status: HintStatus.SUCCESS,
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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

    toBeNaN(received: undefined): MatcherErrorHint {
        void received

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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

    toBeLessThan(received: undefined, expected: number): MatcherErrorHint {
        void received
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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

    toBeLessThanOrEqual(received: undefined, expected: number): MatcherErrorHint {
        void received
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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

    toBeGreaterThan(received: undefined, expected: number): MatcherErrorHint {
        void received
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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

    toBeGreaterThanOrEqual(received: undefined, expected: number): MatcherErrorHint {
        void received
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be a number',
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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

    toExitWith(received: undefined, expected: number): MatcherErrorHint {
        void received
        void expected

        return {
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be an executable',
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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

    toOutput(received: undefined, expected: string[] | IPath, options: Partial<MatcherOutputOptions>): Promise<MatcherErrorHint> {
        void received
        void expected
        void options

        return Promise.resolve({
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message: 'received must be an executable',
            received: {
                value: 'undefined',
                type: ObjectType.UNDEFINED
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
    UndefinedMatcher
}
