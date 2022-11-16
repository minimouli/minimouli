/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compare, toString } from '../version.helper.js'

describe('version.helper', () => {

    describe('compare', () => {

        it('should return a positive number if the major number of the first version is greater than the major number of the second version', () => {
            expect(compare([2, 0, 0], [1, 0, 0])).toBeGreaterThan(0)
        })

        it('should return a positive number if the minor number of the first version is greater than the minor number of the second version', () => {
            expect(compare([1, 1, 0], [1, 0, 0])).toBeGreaterThan(0)
        })

        it('should return a positive number if the patch number of the first version is greater than the patch number of the second version', () => {
            expect(compare([1, 0, 1], [1, 0, 0])).toBeGreaterThan(0)
        })

        it('should return a negative number if the major number of the first version is less than the major number of the second version', () => {
            expect(compare([1, 0, 0], [2, 0, 0])).toBeLessThan(0)
        })

        it('should return a negative number if the minor number of the first version is less than the minor number of the second version', () => {
            expect(compare([1, 0, 0], [1, 1, 0])).toBeLessThan(0)
        })

        it('should return a negative number if the patch number of the first version is less than the patch number of the second version', () => {
            expect(compare([1, 0, 0], [1, 0, 1])).toBeLessThan(0)
        })

        it('should 0 if the versions are identical', () => {
            expect(compare([1, 0, 0], [1, 0, 0])).toBe(0)
        })

    })

    describe('toString', () => {

        it('return the string format of the version', () => {
            expect(toString([1, 2, 3])).toBe('1.2.3')
        })

    })

})
