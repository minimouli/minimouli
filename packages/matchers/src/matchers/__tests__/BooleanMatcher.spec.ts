/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HintStatus, HintType, ObjectType } from '@minimouli/types/hints.js'
import { BooleanMatcher } from '../BooleanMatcher.js'
import { assertToBe, assertToBeFalsy, assertToBeTruthy } from '../../helpers/assert.helper.js'

jest.mock('../../helpers/assert.helper.js')

const mockedAssertToBe = jest.mocked(assertToBe)
const mockedAssertToBeFalsy = jest.mocked(assertToBeFalsy)
const mockedAssertToBeTruthy = jest.mocked(assertToBeTruthy)

describe('BooleanMatcher', () => {

    const matcher = new BooleanMatcher()

    describe('toBe', () => {

        it('should match the hint when the assertion succeeds', () => {

            mockedAssertToBe.mockReturnValue(true)
            const hint = matcher.toBe(true, true)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                expected: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected']
                    },
                    method: 'toBe'
                }
            })
        })

        it('should match the hint when the assertion fails', () => {

            mockedAssertToBe.mockReturnValue(false)
            const hint = matcher.toBe(true, false)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                expected: {
                    value: 'false',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected']
                    },
                    method: 'toBe'
                }
            })
        })

    })

    describe('toBeTruthy', () => {

        it('should match the hint when the assertions succeeds', () => {

            mockedAssertToBeTruthy.mockReturnValue(true)
            const hint = matcher.toBeTruthy(true)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: []
                    },
                    method: 'toBeTruthy'
                }
            })
        })

        it('should match the hint when the assertions fails', () => {

            mockedAssertToBeTruthy.mockReturnValue(false)
            const hint = matcher.toBeTruthy(false)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'false',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: []
                    },
                    method: 'toBeTruthy'
                }
            })
        })

    })

    describe('toBeFalsy', () => {

        it('should match the hint when the assertions succeeds', () => {

            mockedAssertToBeFalsy.mockReturnValue(true)
            const hint = matcher.toBeFalsy(false)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'false',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: []
                    },
                    method: 'toBeFalsy'
                }
            })
        })

        it('should match the hint when the assertions fails', () => {

            mockedAssertToBeFalsy.mockReturnValue(false)
            const hint = matcher.toBeFalsy(true)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: []
                    },
                    method: 'toBeFalsy'
                }
            })
        })

    })

    describe('toBeNull', () => {

        it('should match the hint when the value is true', () => {

            const hint = matcher.toBeNull(true)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: []
                    },
                    method: 'toBeNull'
                }
            })
        })

        it('should match the hint when the value is false', () => {

            const hint = matcher.toBeNull(false)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'false',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: []
                    },
                    method: 'toBeNull'
                }
            })
        })

    })

    describe('toBeDefined', () => {

        it('should match the hint when the value is true', () => {

            const hint = matcher.toBeDefined(true)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: []
                    },
                    method: 'toBeDefined'
                }
            })
        })

        it('should match the hint when the value is false', () => {

            const hint = matcher.toBeDefined(false)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'false',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: []
                    },
                    method: 'toBeDefined'
                }
            })
        })

    })

    describe('toBeUndefined', () => {

        it('should match the hint when the value is true', () => {

            const hint = matcher.toBeUndefined(true)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: []
                    },
                    method: 'toBeUndefined'
                }
            })
        })

        it('should match the hint when the value is false', () => {

            const hint = matcher.toBeUndefined(false)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'false',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: []
                    },
                    method: 'toBeUndefined'
                }
            })
        })

    })

    describe('toBeNaN', () => {

        it('should match the hint when the value is true', () => {

            const hint = matcher.toBeNaN(true)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: []
                    },
                    method: 'toBeNaN'
                }
            })
        })

        it('should match the hint when the value is false', () => {

            const hint = matcher.toBeNaN(false)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'false',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: []
                    },
                    method: 'toBeNaN'
                }
            })
        })

    })

    describe('toBeLessThan', () => {

        it('should match the hint when the value is true', () => {

            const hint = matcher.toBeLessThan(true, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected']
                    },
                    method: 'toBeLessThan'
                }
            })
        })

        it('should match the hint when the value is false', () => {

            const hint = matcher.toBeLessThan(false, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'false',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected']
                    },
                    method: 'toBeLessThan'
                }
            })
        })

    })

    describe('toBeLessThanOrEqual', () => {

        it('should match the hint when the value is true', () => {

            const hint = matcher.toBeLessThanOrEqual(true, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected']
                    },
                    method: 'toBeLessThanOrEqual'
                }
            })
        })

        it('should match the hint when the value is false', () => {

            const hint = matcher.toBeLessThanOrEqual(false, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'false',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected']
                    },
                    method: 'toBeLessThanOrEqual'
                }
            })
        })

    })

    describe('toBeGreaterThan', () => {

        it('should match the hint when the value is true', () => {

            const hint = matcher.toBeGreaterThan(true, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected']
                    },
                    method: 'toBeGreaterThan'
                }
            })
        })

        it('should match the hint when the value is false', () => {

            const hint = matcher.toBeGreaterThan(false, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'false',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected']
                    },
                    method: 'toBeGreaterThan'
                }
            })
        })

    })

    describe('toBeGreaterThanOrEqual', () => {

        it('should match the hint when the value is true', () => {

            const hint = matcher.toBeGreaterThanOrEqual(true, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected']
                    },
                    method: 'toBeGreaterThanOrEqual'
                }
            })
        })

        it('should match the hint when the value is false', () => {

            const hint = matcher.toBeGreaterThanOrEqual(false, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'false',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected']
                    },
                    method: 'toBeGreaterThanOrEqual'
                }
            })
        })

    })

    describe('toExitWith', () => {

        it('should match the hint when the value is true', () => {

            const hint = matcher.toExitWith(true, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be an executable',
                received: {
                    value: 'true',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected']
                    },
                    method: 'toExitWith'
                }
            })
        })

        it('should match the hint when the value is false', () => {

            const hint = matcher.toExitWith(false, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be an executable',
                received: {
                    value: 'false',
                    type: ObjectType.BOOLEAN
                },
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected']
                    },
                    method: 'toExitWith'
                }
            })
        })

    })

    describe('toOutput', () => {

        it('should match the hint when the value is true', async () => {

            const hint = await matcher.toOutput(true, 0, {})

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be an executable',
                received: {
                    value: 'true',
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
        })

        it('should match the hint when the value is false', async () => {

            const hint = await matcher.toOutput(false, 0, {})

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be an executable',
                received: {
                    value: 'false',
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
        })

    })

})
