/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Argument } from '../Argument.js'
import { BooleanArgument } from '../boolean.argument.js'

describe('BooleanArgument', () => {

    describe('content', () => {

        it('should return the internal content if not undefined', () => {

            const argument = new BooleanArgument('test')
            argument.setContent(true)

            expect(argument.content).toBeTruthy()
        })

        it('should return true if the internal content is true in string', () => {

            const argument = new BooleanArgument('test')
            argument.setContent('true')

            expect(argument.content).toBeTruthy()
        })

        it('should return true if the internal content is an empty string', () => {

            const argument = new BooleanArgument('test')
            argument.setContent('')

            expect(argument.content).toBeTruthy()
        })

        it('should return false if the internal content is any other string value', () => {

            const argument = new BooleanArgument('test')
            argument.setContent('hello')

            expect(argument.content).toBeFalsy()
        })

        it('should return false if the internal content is undefined', () => {

            const argument = new BooleanArgument('test')

            expect(argument.content).toBeFalsy()
        })

    })

    describe('validate', () => {

        it('should return false if the parent method does not validate', () => {

            const parentValidate = jest.spyOn(Argument.prototype, 'validate')
            parentValidate.mockReturnValue(false)

            const argument = new BooleanArgument('test')

            expect(argument.validate('test value')).toBeFalsy()
            expect(parentValidate).toHaveBeenCalledWith('test value')
        })

        it('should return true if the parent validate the undefined value', () => {

            const parentValidate = jest.spyOn(Argument.prototype, 'validate')
            parentValidate.mockReturnValue(true)

            const argument = new BooleanArgument('test')

            // eslint-disable-next-line unicorn/no-useless-undefined
            expect(argument.validate(undefined)).toBeTruthy()
            expect(parentValidate).toHaveBeenCalledWith(undefined)
        })

        it('should return true if the content is true in string', () => {

            const argument = new BooleanArgument('test')

            expect(argument.validate('true')).toBeTruthy()
        })

        it('should return true if the content is false in string', () => {

            const argument = new BooleanArgument('test')

            expect(argument.validate('false')).toBeTruthy()
        })

        it('should return true if the content is an empty string', () => {

            const argument = new BooleanArgument('test')

            expect(argument.validate('')).toBeTruthy()
        })

        it('should return false if the content is any other string', () => {

            const argument = new BooleanArgument('test')

            expect(argument.validate('hello world')).toBeFalsy()
        })

    })

})
