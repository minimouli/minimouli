/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Argument } from '../Argument.js'
import { IntegerArgument } from '../integer.argument.js'

describe('IntegerArgument', () => {

    describe('content', () => {

        it('should return the internal content if the internal content is a number', () => {

            const argument = new IntegerArgument('test')
            argument.setContent(42)

            expect(argument.content).toBe(42)
        })

        it('should return the internal content if the internal content is a number string', () => {

            const argument = new IntegerArgument('test')
            argument.setContent('42')

            expect(argument.content).toBe(42)
        })

        it('should return NaN if the internal content is not a number string', () => {

            const argument = new IntegerArgument('test')
            argument.setContent('hello world')

            expect(argument.content).toBeNaN()
        })

        it('should return NaN if the internal content is NaN', () => {

            const argument = new IntegerArgument('test')
            argument.setContent(Number.NaN)

            expect(argument.content).toBeNaN()
        })

        it('should return NaN if the internal content is undefined', () => {

            const argument = new IntegerArgument('test')

            expect(argument.content).toBeNaN()
        })

    })

    describe('validate', () => {

        it('should return false if the parent method does not validate', () => {

            const parentValidate = jest.spyOn(Argument.prototype, 'validate')
            parentValidate.mockReturnValue(false)

            const argument = new IntegerArgument('test')

            expect(argument.validate('test value')).toBeFalsy()
            expect(parentValidate).toHaveBeenCalledWith('test value')
        })

        it('should return true if the parent method validate the undefined value', () => {

            const parentValidate = jest.spyOn(Argument.prototype, 'validate')
            parentValidate.mockReturnValue(true)

            const argument = new IntegerArgument('test')

            // eslint-disable-next-line unicorn/no-useless-undefined
            expect(argument.validate(undefined)).toBeTruthy()
            expect(parentValidate).toHaveBeenCalledWith(undefined)
        })

        it('should return false if the content is an empty string', () => {

            const argument = new IntegerArgument('test')

            expect(argument.validate('')).toBeFalsy()
        })

        it('should return false if the content only contains characters other than numbers', () => {

            const argument = new IntegerArgument('test')

            expect(argument.validate('hello world!')).toBeFalsy()
        })

        it('should return false if the content contains numbers and other characters', () => {

            const argument = new IntegerArgument('test')

            expect(argument.validate('12px')).toBeFalsy()
        })

        it('should return false if the content is a floating point string', () => {

            const argument = new IntegerArgument('test')

            expect(argument.validate('3.14')).toBeFalsy()
        })

        it('should return false if the content is not a safe integer string', () => {

            const argument = new IntegerArgument('test')
            const number = IntegerArgument.DEFAULT_MAX_VALUE + 1

            expect(argument.validate(number.toString())).toBeFalsy()
        })

        it('should return true if the content is a negative integer string', () => {

            const argument = new IntegerArgument('test')

            expect(argument.validate('-123')).toBeTruthy()
        })

        it('should return true if the content is a positive integer string with sign', () => {

            const argument = new IntegerArgument('test')

            expect(argument.validate('+123')).toBeTruthy()
        })

        it('should return true if the content is a positive integer string without sign', () => {

            const argument = new IntegerArgument('test')

            expect(argument.validate('123')).toBeTruthy()
        })

    })

    describe('setMinimum', () => {

        it('should return the minimum value if the internal value is smaller', () => {

            const argument = new IntegerArgument('test')
            argument.setMinimum(10)
            argument.setContent(5)

            expect(argument.content).toBe(10)
        })

        it('should return the minimum value rounded up if the internal value is smaller and the minimum value is an floating point', () => {

            const argument = new IntegerArgument('test')
            argument.setMinimum(9.9)
            argument.setContent(5)

            expect(argument.content).toBe(10)
        })

        it('should return the minimum value rounded down if the internal value is smaller and the minimum value is an floating point', () => {

            const argument = new IntegerArgument('test')
            argument.setMinimum(10.1)
            argument.setContent(5)

            expect(argument.content).toBe(10)
        })

        it('should return the internal value if the minimum value is smaller than the internal value', () => {

            const argument = new IntegerArgument('test')
            argument.setMinimum(0)
            argument.setContent(5)

            expect(argument.content).toBe(5)
        })

    })

    describe('setMaximum', () => {

        it('should return the maximum value if the internal value is greater', () => {

            const argument = new IntegerArgument('test')
            argument.setMaximum(10)
            argument.setContent(15)

            expect(argument.content).toBe(10)
        })

        it('should return the maximum value rounded up if the internal value is greater and the maximum value is an floating point', () => {

            const argument = new IntegerArgument('test')
            argument.setMaximum(9.9)
            argument.setContent(15)

            expect(argument.content).toBe(10)
        })

        it('should return the maximum value rounded down if the internal value is greater and the maximum value is an floating point', () => {

            const argument = new IntegerArgument('test')
            argument.setMaximum(10.1)
            argument.setContent(15)

            expect(argument.content).toBe(10)
        })

        it('should return the internal value if the maximum value is greater than the internal value', () => {

            const argument = new IntegerArgument('test')
            argument.setMaximum(20)
            argument.setContent(15)

            expect(argument.content).toBe(15)
        })

    })

})
