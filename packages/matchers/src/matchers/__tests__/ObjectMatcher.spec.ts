/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HintStatus, HintType, ObjectType } from '@minimouli/types/hints'
import { ObjectMatcher } from '../ObjectMatcher.js'
import { assertToBeFalsy, assertToBeNull, assertToBeTruthy, assertToEqual } from '../../helpers/assert.helper.js'

jest.mock('../../helpers/assert.helper.js')

const mockedAssertToBeFalsy = jest.mocked(assertToBeFalsy)
const mockedAssertToBeNull = jest.mocked(assertToBeNull)
const mockedAssertToBeTruthy = jest.mocked(assertToBeTruthy)
const mockedAssertToEqual = jest.mocked(assertToEqual)

describe('ObjectMatcher', () => {

    const matcher = new ObjectMatcher()

    describe('toBe', () => {

        it('should match the hint when the assertion succeeds', () => {

            mockedAssertToEqual.mockReturnValue(true)
            const hint = matcher.toBe([0], [0])

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
                },
                expected: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

            mockedAssertToEqual.mockReturnValue(false)
            const hint = matcher.toBe([0], [1])

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
                },
                expected: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the values are null', () => {

            mockedAssertToEqual.mockReturnValue(true)
            // eslint-disable-next-line unicorn/no-null
            const hint = matcher.toBe(null, null)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'null',
                    type: ObjectType.OBJECT
                },
                expected: {
                    value: 'null',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the assertion succeeds', () => {

            mockedAssertToBeTruthy.mockReturnValue(true)
            const hint = matcher.toBeTruthy({})

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the assertion fails', () => {

            mockedAssertToBeTruthy.mockReturnValue(false)
            // eslint-disable-next-line unicorn/no-null
            const hint = matcher.toBeTruthy(null)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'null',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the assertion succeeds', () => {

            mockedAssertToBeFalsy.mockReturnValue(true)
            // eslint-disable-next-line unicorn/no-null
            const hint = matcher.toBeFalsy(null)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'null',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the assertion fails', () => {

            mockedAssertToBeFalsy.mockReturnValue(false)
            const hint = matcher.toBeFalsy({})

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the assertion succeeds', () => {

            mockedAssertToBeNull.mockReturnValue(true)
            // eslint-disable-next-line unicorn/no-null
            const hint = matcher.toBeNull(null)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'null',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the assertion fails', () => {

            mockedAssertToBeNull.mockReturnValue(false)
            const hint = matcher.toBeNull({})

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is not null', () => {

            const hint = matcher.toBeDefined({})

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is null', () => {

            // eslint-disable-next-line unicorn/no-null
            const hint = matcher.toBeDefined(null)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'null',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is not null', () => {

            const hint = matcher.toBeUndefined({})

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is null', () => {

            // eslint-disable-next-line unicorn/no-null
            const hint = matcher.toBeUndefined(null)

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'null',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is not null', () => {

            const hint = matcher.toBeNaN({})

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is null', () => {

            // eslint-disable-next-line unicorn/no-null
            const hint = matcher.toBeNaN(null)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'null',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is not null', () => {

            const hint = matcher.toBeLessThan({}, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is null', () => {

            // eslint-disable-next-line unicorn/no-null
            const hint = matcher.toBeLessThan(null, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'null',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is not null', () => {

            const hint = matcher.toBeLessThanOrEqual({}, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is null', () => {

            // eslint-disable-next-line unicorn/no-null
            const hint = matcher.toBeLessThanOrEqual(null, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'null',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is not null', () => {

            const hint = matcher.toBeGreaterThan({}, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is null', () => {

            // eslint-disable-next-line unicorn/no-null
            const hint = matcher.toBeGreaterThan(null, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'null',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is not null', () => {

            const hint = matcher.toBeGreaterThanOrEqual({}, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is null', () => {

            // eslint-disable-next-line unicorn/no-null
            const hint = matcher.toBeGreaterThanOrEqual(null, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: 'null',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is not null', () => {

            const hint = matcher.toExitWith({}, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be an executable',
                received: {
                    value: 'object',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is null', () => {

            // eslint-disable-next-line unicorn/no-null
            const hint = matcher.toExitWith(null, 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be an executable',
                received: {
                    value: 'null',
                    type: ObjectType.OBJECT
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

        it('should match the hint when the value is not null', async () => {

            const hint = await matcher.toOutput({}, 0, {})

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be an executable',
                received: {
                    value: 'object',
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
        })

        it('should match the hint when the value is null', async () => {

            // eslint-disable-next-line unicorn/no-null
            const hint = await matcher.toOutput(null, 0, {})

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be an executable',
                received: {
                    value: 'null',
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
        })

    })

})
