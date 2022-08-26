/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Argument } from '../Argument.js'
import { EnumArgument } from '../enum.argument.js'

describe('EnumArgument', () => {

    describe('content', () => {

        it('should return the internal content if not undefined', () => {

            const argument = new EnumArgument('test')
            argument.setValues(['a', 'b', 'c'])
            argument.setContent('b')

            expect(argument.content).toBe('b')
        })

        it('should return an empty string if the internal content is not in the possible values', () => {

            const argument = new EnumArgument('test')
            argument.setValues(['a', 'b', 'c'])
            argument.setContent('d')

            expect(argument.content).toBe('')
        })

        it('should return an empty string if the internal content is undefined', () => {

            const argument = new EnumArgument('test')

            expect(argument.content).toBe('')
        })

    })

    describe('validate', () => {

        it('should return false if the parent method does not validate', () => {

            const parentValidate = jest.spyOn(Argument.prototype, 'validate')
            parentValidate.mockReturnValue(false)

            const argument = new EnumArgument('test')

            expect(argument.validate('test value')).toBeFalsy()
            expect(parentValidate).toHaveBeenCalledWith('test value')
        })

        it('should return true if the parent method validate the undefined value', () => {

            const parentValidate = jest.spyOn(Argument.prototype, 'validate')
            parentValidate.mockReturnValue(true)

            const argument = new EnumArgument('test')

            // eslint-disable-next-line unicorn/no-useless-undefined
            expect(argument.validate(undefined)).toBeTruthy()
            expect(parentValidate).toHaveBeenCalledWith('test value')
        })

        it('should return true if the content is in the possible values', () => {

            const argument = new EnumArgument('test')
            argument.setValues(['a', 'b', 'c'])

            expect(argument.validate('a')).toBeTruthy()
        })

        it('should return false if the content is not in the possible values', () => {

            const argument = new EnumArgument('test')
            argument.setValues(['a', 'b', 'c'])

            expect(argument.validate('d')).toBeFalsy()
        })

    })

})
