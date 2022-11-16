/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable unicorn/no-useless-undefined */

import { HintStatus, HintType, ObjectType } from '@minimouli/types/hints'
import { UndefinedMatcher } from '../undefined.matcher.js'

describe('UndefinedMatcher', () => {

    const matcher = new UndefinedMatcher()

    describe('toBe', () => {

        it('should match the hint', () => {

            const hint = matcher.toBe(undefined, undefined)

            expect(hint).toEqual({
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
            })
        })

    })

    describe('toBeTruthy', () => {

        it('should match the hint', () => {

            const hint = matcher.toBeTruthy(undefined)

            expect(hint).toEqual({
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
            })
        })

    })

    describe('toBeFalsy', () => {

        it('should match the hint', () => {

            const hint = matcher.toBeFalsy(undefined)

            expect(hint).toEqual({
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
            })
        })

    })

    describe('toBeNull', () => {

        it('should match the hint', () => {

            const hint = matcher.toBeNull(undefined)

            expect(hint).toEqual({
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
            })
        })

    })

    describe('toBeDefined', () => {

        it('should match the hint', () => {

            const hint = matcher.toBeDefined(undefined)

            expect(hint).toEqual({
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
            })
        })

    })

    describe('toBeUndefined', () => {

        it('should match the hint', () => {

            const hint = matcher.toBeUndefined(undefined)

            expect(hint).toEqual({
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
            })
        })

    })

    describe('toBeNaN', () => {

        it('should match the hint', () => {

            const hint = matcher.toBeNaN(undefined)

            expect(hint).toEqual({
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
            })
        })

    })

    describe('toBeLessThan', () => {

        it('should match the hint', () => {

            const hint = matcher.toBeLessThan(undefined, 0)

            expect(hint).toEqual({
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
            })
        })

    })

    describe('toBeLessThanOrEqual', () => {

        it('should match the hint', () => {

            const hint = matcher.toBeLessThanOrEqual(undefined, 0)

            expect(hint).toEqual({
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
            })
        })

    })

    describe('toBeGreaterThan', () => {

        it('should match the hint', () => {

            const hint = matcher.toBeGreaterThan(undefined, 0)

            expect(hint).toEqual({
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
            })
        })

    })

    describe('toBeGreaterThanOrEqual', () => {

        it('should match the hint', () => {

            const hint = matcher.toBeGreaterThanOrEqual(undefined, 0)

            expect(hint).toEqual({
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
            })
        })

    })

    describe('toExitWith', () => {

        it('should match the hint', () => {

            const hint = matcher.toExitWith(undefined, 0)

            expect(hint).toEqual({
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
            })
        })

    })

    describe('toOutput', () => {

        it('should match the hint', async () => {

            const hint = await matcher.toOutput(undefined, 0, {})

            expect(hint).toEqual({
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
        })

    })

})
