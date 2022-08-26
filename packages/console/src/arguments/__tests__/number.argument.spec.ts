/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Argument } from '../Argument.js'
import { NumberArgument } from '../number.argument.js'

describe('NumberArgument', () => {

    describe('content', () => {

        it('should return the internal content if the internal content is a number', () => {

            const argument = new NumberArgument('test')
            argument.setContent(3.14)

            expect(argument.content).toBe(3.14)
        })

        it('should return the internal content if the internal content is a number string', () => {

            const argument = new NumberArgument('test')
            argument.setContent('3.14')

            expect(argument.content).toBe(3.14)
        })

        it('should return NaN if the internal content is not a number string', () => {

            const argument = new NumberArgument('test')
            argument.setContent('hello world')

            expect(argument.content).toBeNaN()
        })

        it('should return NaN if the internal content is NaN', () => {

            const argument = new NumberArgument('test')
            argument.setContent(Number.NaN)

            expect(argument.content).toBeNaN()
        })

        it('should return NaN if the internal content is undefined', () => {

            const argument = new NumberArgument('test')

            expect(argument.content).toBeNaN()
        })

    })

    describe('validate', () => {

        it('should return false if the parent method does not validate', () => {

            const parentValidate = jest.spyOn(Argument.prototype, 'validate')
            parentValidate.mockReturnValue(false)

            const argument = new NumberArgument('test')

            expect(argument.validate('test value')).toBeFalsy()
            expect(parentValidate).toHaveBeenCalledWith('test value')
        })

        it('should return true if the parent method validate the undefined value', () => {

            const parentValidate = jest.spyOn(Argument.prototype, 'validate')
            parentValidate.mockReturnValue(true)

            const argument = new NumberArgument('test')

            // eslint-disable-next-line unicorn/no-useless-undefined
            expect(argument.validate(undefined)).toBeTruthy()
            expect(parentValidate).toHaveBeenCalledWith(undefined)
        })

        it('should return false if the content is an empty string', () => {

            const argument = new NumberArgument('test')

            expect(argument.validate('')).toBeFalsy()
        })

        it('should return false if the content only contains characters', () => {

            const argument = new NumberArgument('test')

            expect(argument.validate('hello world!')).toBeFalsy()
        })

        it('should return false if the content contains numbers and other characters', () => {

            const argument = new NumberArgument('test')

            expect(argument.validate('12px')).toBeFalsy()
        })

        it('should return true if the content is a negative number string', () => {

            const argument = new NumberArgument('test')

            expect(argument.validate('-3.14')).toBeTruthy()
        })

        it('should return true if the content is a positive number string with sign', () => {

            const argument = new NumberArgument('test')

            expect(argument.validate('+3.14')).toBeTruthy()
        })

        it('should return true if the content is a positive number string without sign', () => {

            const argument = new NumberArgument('test')

            expect(argument.validate('3.14')).toBeTruthy()
        })

    })

    describe('setMinimum', () => {

        it('should return the minimum value if the internal value is smaller', () => {

            const argument = new NumberArgument('test')
            argument.setMinimum(10.6)
            argument.setContent(5.2)

            expect(argument.content).toBe(10.6)
        })

        it('should return the internal value if the minimum value is smaller than the content value', () => {

            const argument = new NumberArgument('test')
            argument.setMinimum(5.2)
            argument.setContent(10.6)

            expect(argument.content).toBe(10.6)
        })

    })

    describe('setMaximum', () => {

        it('should return the minimum value if the internal value is smaller', () => {

            const argument = new NumberArgument('test')
            argument.setMaximum(5.2)
            argument.setContent(10.6)

            expect(argument.content).toBe(5.2)
        })

        it('should return the internal value if the minimum value is smaller than the internal value', () => {

            const argument = new NumberArgument('test')
            argument.setMaximum(10.6)
            argument.setContent(5.2)

            expect(argument.content).toBe(5.2)
        })

    })

})
