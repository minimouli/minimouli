/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ComparisonSymbol, HintStatus, HintType, ObjectType } from '@minimouli/types/hints'
import { NumberMatcher } from '../number.matcher.js'
import {
    assert,
    assertToBe,
    assertToBeFalsy,
    assertToBeNaN,
    assertToBeTruthy
} from '../../helpers/assert.helper.js'

jest.mock('../../helpers/assert.helper.js')

const mockedAssert = jest.mocked(assert)
const mockedAssertToBe = jest.mocked(assertToBe)
const mockedAssertToBeFalsy = jest.mocked(assertToBeFalsy)
const mockedAssertToBeNaN = jest.mocked(assertToBeNaN)
const mockedAssertToBeTruthy = jest.mocked(assertToBeTruthy)

describe('NumberMatcher', () => {

    const matcher = new NumberMatcher()

    describe('toBe', () => {

        it('should match the hint when the assertion succeeds', () => {

            mockedAssertToBe.mockReturnValue(true)
            const hint = matcher.toBe(0, 0)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Success,
                received: {
                    value: '0',
                    type: ObjectType.Number
                },
                expected: {
                    value: '0',
                    type: ObjectType.Number
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
            const hint = matcher.toBe(0, 1)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Failure,
                received: {
                    value: '0',
                    type: ObjectType.Number
                },
                expected: {
                    value: '1',
                    type: ObjectType.Number
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
            const hint = matcher.toBeTruthy(1)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Success,
                received: {
                    value: '1',
                    type: ObjectType.Number
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
            const hint = matcher.toBeTruthy(0)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Failure,
                received: {
                    value: '0',
                    type: ObjectType.Number
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
            const hint = matcher.toBeFalsy(0)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Success,
                received: {
                    value: '0',
                    type: ObjectType.Number
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
            const hint = matcher.toBeFalsy(1)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Failure,
                received: {
                    value: '1',
                    type: ObjectType.Number
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

        it('should match the hint', () => {

            const hint = matcher.toBeNull(0)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Failure,
                received: {
                    value: '0',
                    type: ObjectType.Number
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

        it('should match the hint', () => {

            const hint = matcher.toBeDefined(0)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Success,
                received: {
                    value: '0',
                    type: ObjectType.Number
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

        it('should match the hint', () => {

            const hint = matcher.toBeUndefined(0)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Failure,
                received: {
                    value: '0',
                    type: ObjectType.Number
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

        it('should match the hint when the assertion succeeds', () => {

            mockedAssertToBeNaN.mockReturnValue(true)
            const hint = matcher.toBeNaN(Number.NaN)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Success,
                received: {
                    value: 'NaN',
                    type: ObjectType.Number
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

        it('should match the hint when the assertion fails', () => {

            mockedAssertToBeNaN.mockReturnValue(false)
            const hint = matcher.toBeNaN(0)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Failure,
                received: {
                    value: '0',
                    type: ObjectType.Number
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

        it('should match the hint when the assertion succeeds', () => {

            mockedAssert.mockReturnValue(true)
            const hint = matcher.toBeLessThan(1, 2)

            expect(hint).toEqual({
                type: HintType.Comparison,
                status: HintStatus.Success,
                symbol: ComparisonSymbol.LessThan,
                received: {
                    value: '1',
                    type: ObjectType.Number
                },
                expected: {
                    value: '2',
                    type: ObjectType.Number
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

        it('should match the hint when the assertion fails', () => {

            mockedAssert.mockReturnValue(false)
            const hint = matcher.toBeLessThan(1, 0)

            expect(hint).toEqual({
                type: HintType.Comparison,
                status: HintStatus.Failure,
                symbol: ComparisonSymbol.LessThan,
                received: {
                    value: '1',
                    type: ObjectType.Number
                },
                expected: {
                    value: '0',
                    type: ObjectType.Number
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

        it('should match the hint when the assertion succeeds', () => {

            mockedAssert.mockReturnValue(true)
            const hint = matcher.toBeLessThanOrEqual(1, 1)

            expect(hint).toEqual({
                type: HintType.Comparison,
                status: HintStatus.Success,
                symbol: ComparisonSymbol.LessThanOrEqual,
                received: {
                    value: '1',
                    type: ObjectType.Number
                },
                expected: {
                    value: '1',
                    type: ObjectType.Number
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

        it('should match the hint when the assertion fails', () => {

            mockedAssert.mockReturnValue(false)
            const hint = matcher.toBeLessThanOrEqual(1, 0)

            expect(hint).toEqual({
                type: HintType.Comparison,
                status: HintStatus.Failure,
                symbol: ComparisonSymbol.LessThanOrEqual,
                received: {
                    value: '1',
                    type: ObjectType.Number
                },
                expected: {
                    value: '0',
                    type: ObjectType.Number
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

        it('should match the hint when the assertion succeeds', () => {

            mockedAssert.mockReturnValue(true)
            const hint = matcher.toBeGreaterThan(1, 0)

            expect(hint).toEqual({
                type: HintType.Comparison,
                status: HintStatus.Success,
                symbol: ComparisonSymbol.GreaterThan,
                received: {
                    value: '1',
                    type: ObjectType.Number
                },
                expected: {
                    value: '0',
                    type: ObjectType.Number
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

        it('should match the hint when the assertion fails', () => {

            mockedAssert.mockReturnValue(false)
            const hint = matcher.toBeGreaterThan(1, 2)

            expect(hint).toEqual({
                type: HintType.Comparison,
                status: HintStatus.Failure,
                symbol: ComparisonSymbol.GreaterThan,
                received: {
                    value: '1',
                    type: ObjectType.Number
                },
                expected: {
                    value: '2',
                    type: ObjectType.Number
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

        it('should match the hint when the assertion succeeds', () => {

            mockedAssert.mockReturnValue(true)
            const hint = matcher.toBeGreaterThanOrEqual(1, 1)

            expect(hint).toEqual({
                type: HintType.Comparison,
                status: HintStatus.Success,
                symbol: ComparisonSymbol.GreaterThanOrEqual,
                received: {
                    value: '1',
                    type: ObjectType.Number
                },
                expected: {
                    value: '1',
                    type: ObjectType.Number
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

        it('should match the hint when the assertion fails', () => {

            mockedAssert.mockReturnValue(false)
            const hint = matcher.toBeGreaterThanOrEqual(1, 2)

            expect(hint).toEqual({
                type: HintType.Comparison,
                status: HintStatus.Failure,
                symbol: ComparisonSymbol.GreaterThanOrEqual,
                received: {
                    value: '1',
                    type: ObjectType.Number
                },
                expected: {
                    value: '2',
                    type: ObjectType.Number
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

        it('should match the hint', () => {

            const hint = matcher.toExitWith(0, 0)

            expect(hint).toEqual({
                type: HintType.MatcherError,
                status: HintStatus.Failure,
                message: 'received must be an executable',
                received: {
                    value: '0',
                    type: ObjectType.Number
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

        it('should match the hint', async () => {

            const hint = await matcher.toOutput(0, 0, {})

            expect(hint).toEqual({
                type: HintType.MatcherError,
                status: HintStatus.Failure,
                message: 'received must be an executable',
                received: {
                    value: '0',
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
        })

    })

})
