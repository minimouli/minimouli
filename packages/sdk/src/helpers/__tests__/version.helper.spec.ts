/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fromString } from '../version.helper.js'

describe('version.helper', () => {

    describe('fromString', () => {

        it('should return the correct version', () => {
            const version = '1.2.3'
            expect(fromString(version)).toStrictEqual([1, 2, 3])
        })

        it('should return a NaN version if the version does not contain numbers', () => {
            const version = 'a.b.c'
            expect(fromString(version)).toStrictEqual([Number.NaN, Number.NaN, Number.NaN])
        })

        it('should return a NaN version if the version contains less than 3 numbers', () => {
            const version = '1.2'
            expect(fromString(version)).toStrictEqual([Number.NaN, Number.NaN, Number.NaN])
        })

        it('should return a NaN version if the version contains more than 3 numbers', () => {
            const version = '1.2.3.4'
            expect(fromString(version)).toStrictEqual([Number.NaN, Number.NaN, Number.NaN])
        })

    })

})
