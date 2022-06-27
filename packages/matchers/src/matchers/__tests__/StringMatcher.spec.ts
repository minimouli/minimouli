/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HintStatus, HintType, ObjectType } from '@minimouli/types/hints.js'
import { StringMatcher } from '../StringMatcher.js'
import { assertToBe, assertToBeFalsy, assertToBeTruthy } from '../../helpers/assert.helper.js'

jest.mock('../../helpers/assert.helper.js')

const mockedAssertToBe = jest.mocked(assertToBe)
const mockedAssertToBeFalsy = jest.mocked(assertToBeFalsy)
const mockedAssertToBeTruthy = jest.mocked(assertToBeTruthy)

describe('StringMatcher', () => {

    const matcher = new StringMatcher()

    describe('toBe', () => {

        it('should match the hint when the assertion succeeds', () => {

            mockedAssertToBe.mockReturnValue(true)
            const hint = matcher.toBe('hello', 'hello')

            expect(hint).toEqual({
                type: HintType.STRING_DIFF,
                status: HintStatus.SUCCESS,
                received: {
                    value: ['hello'],
                    type: ObjectType.STRING
                },
                expected: {
                    value: ['hello'],
                    type: ObjectType.STRING
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
            const hint = matcher.toBe('hello', 'bonjour')

            expect(hint).toEqual({
                type: HintType.STRING_DIFF,
                status: HintStatus.FAILURE,
                received: {
                    value: ['hello'],
                    type: ObjectType.STRING
                },
                expected: {
                    value: ['bonjour'],
                    type: ObjectType.STRING
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
            const hint = matcher.toBeTruthy('hello')

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: 'hello',
                    type: ObjectType.STRING
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
            const hint = matcher.toBeTruthy('')

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: '',
                    type: ObjectType.STRING
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
            const hint = matcher.toBeFalsy('')

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: '',
                    type: ObjectType.STRING
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
            const hint = matcher.toBeFalsy('hello')

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: 'hello',
                    type: ObjectType.STRING
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

            const hint = matcher.toBeNull('')

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: '',
                    type: ObjectType.STRING
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

            const hint = matcher.toBeDefined('')

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.SUCCESS,
                received: {
                    value: '',
                    type: ObjectType.STRING
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

            const hint = matcher.toBeUndefined('')

            expect(hint).toEqual({
                type: HintType.EQUAL,
                status: HintStatus.FAILURE,
                received: {
                    value: '',
                    type: ObjectType.STRING
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

        it('should match the hint', () => {

            const hint = matcher.toBeNaN('')

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: '',
                    type: ObjectType.STRING
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

        it('should match the hint', () => {

            const hint = matcher.toBeLessThan('', 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: '',
                    type: ObjectType.STRING
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

        it('should match the hint', () => {

            const hint = matcher.toBeLessThanOrEqual('', 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: '',
                    type: ObjectType.STRING
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

        it('should match the hint', () => {

            const hint = matcher.toBeGreaterThan('', 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: '',
                    type: ObjectType.STRING
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

        it('should match the hint', () => {

            const hint = matcher.toBeGreaterThanOrEqual('', 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be a number',
                received: {
                    value: '',
                    type: ObjectType.STRING
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

            const hint = matcher.toExitWith('', 0)

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be an executable',
                received: {
                    value: '',
                    type: ObjectType.STRING
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

            const hint = await matcher.toOutput('', 0, {})

            expect(hint).toEqual({
                type: HintType.MATCHER_ERROR,
                status: HintStatus.FAILURE,
                message: 'received must be an executable',
                received: {
                    value: '',
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
        })

    })

})
