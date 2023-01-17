/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HintCategory, HintStatus, HintType, ObjectType } from '@minimouli/types/hints'
import { ExecutableMatcher } from '../executable.matcher.js'
import { assertToBe, assertToBeFalsy, assertToBeTruthy, assertToEqual } from '../../helpers/assert.helper.js'

jest.mock('../../helpers/assert.helper.js')

const mockedAssertToBe = jest.mocked(assertToBe)
const mockedAssertToBeFalsy = jest.mocked(assertToBeFalsy)
const mockedAssertToBeTruthy = jest.mocked(assertToBeTruthy)
const mockedAssertToEqual = jest.mocked(assertToEqual)

describe('ExecutableMatcher', () => {

    const matcher = new ExecutableMatcher()
    const executable = {
        exitCode: 0,
        savedStdoutPath: {
            toString: () => 'stdout-path'
        },
        savedStderrPath: {
            toString: () => 'stderr-path'
        }
    }

    describe('toBe', () => {

        it('should match the hint when the assertion succeeds', () => {

            mockedAssertToEqual.mockReturnValue(true)
            const hint = matcher.toBe(executable, executable)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Success,
                received: {
                    value: 'Executable',
                    type: ObjectType.Object
                },
                expected: {
                    value: 'Executable',
                    type: ObjectType.Object
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
            const hint = matcher.toBe(executable, executable)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Failure,
                received: {
                    value: 'Executable',
                    type: ObjectType.Object
                },
                expected: {
                    value: 'Executable',
                    type: ObjectType.Object
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
            const hint = matcher.toBeTruthy(executable)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Success,
                received: {
                    value: 'Executable',
                    type: ObjectType.Object
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

        it('should match the hint when the assertion fails', () => {

            mockedAssertToBeFalsy.mockReturnValue(false)
            const hint = matcher.toBeFalsy(executable)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Failure,
                received: {
                    value: 'Executable',
                    type: ObjectType.Object
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

        it('should match the hint when the assertion fails', () => {

            const hint = matcher.toBeNull()

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Failure,
                received: {
                    value: 'Executable',
                    type: ObjectType.Object
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

        it('should match the hint when the assertion succeeds', () => {

            const hint = matcher.toBeDefined()

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Success,
                received: {
                    value: 'Executable',
                    type: ObjectType.Object
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

        it('should match the hint when the assertion fails', () => {

            const hint = matcher.toBeUndefined()

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Failure,
                received: {
                    value: 'Executable',
                    type: ObjectType.Object
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

        it('should match the hint when the assertion fails', () => {

            const hint = matcher.toBeNaN()

            expect(hint).toEqual({
                type: HintType.MatcherError,
                status: HintStatus.Failure,
                message: 'received must be a number',
                received: {
                    value: 'Executable',
                    type: ObjectType.Object
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

        it('should match the hint when the assertion fails', () => {

            const hint = matcher.toBeLessThan()

            expect(hint).toEqual({
                type: HintType.MatcherError,
                status: HintStatus.Failure,
                message: 'received must be a number',
                received: {
                    value: 'Executable',
                    type: ObjectType.Object
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

        it('should match the hint when the assertion fails', () => {

            const hint = matcher.toBeLessThanOrEqual()

            expect(hint).toEqual({
                type: HintType.MatcherError,
                status: HintStatus.Failure,
                message: 'received must be a number',
                received: {
                    value: 'Executable',
                    type: ObjectType.Object
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

        it('should match the hint when the assertion fails', () => {

            const hint = matcher.toBeGreaterThan()

            expect(hint).toEqual({
                type: HintType.MatcherError,
                status: HintStatus.Failure,
                message: 'received must be a number',
                received: {
                    value: 'Executable',
                    type: ObjectType.Object
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

        it('should match the hint when the assertion fails', () => {

            const hint = matcher.toBeGreaterThanOrEqual()

            expect(hint).toEqual({
                type: HintType.MatcherError,
                status: HintStatus.Failure,
                message: 'received must be a number',
                received: {
                    value: 'Executable',
                    type: ObjectType.Object
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

        it('should match the hint when the assertion succeeds', () => {

            mockedAssertToBe.mockReturnValue(true)
            const hint = matcher.toExitWith(executable, 0)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Success,
                category: HintCategory.ExitCode,
                received: {
                    value: executable.exitCode.toString(),
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
                    method: 'toExitWith'
                }
            })
        })

        it('should match the hint when the assertion fails', () => {

            mockedAssertToBe.mockReturnValue(false)
            const hint = matcher.toExitWith(executable, 1)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Failure,
                category: HintCategory.ExitCode,
                received: {
                    value: executable.exitCode.toString(),
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
                    method: 'toExitWith'
                }
            })
        })

        it('should match the hint when the exit code is null', () => {
            const executableWithNull = {
                ...executable,
                // eslint-disable-next-line unicorn/no-null
                exitCode: null
            }

            mockedAssertToBe.mockReturnValue(false)
            const hint = matcher.toExitWith(executableWithNull, 0)

            expect(hint).toEqual({
                type: HintType.Equality,
                status: HintStatus.Failure,
                category: HintCategory.ExitCode,
                received: {
                    value: 'null',
                    type: ObjectType.Object
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
                    method: 'toExitWith'
                }
            })
        })

    })

})
