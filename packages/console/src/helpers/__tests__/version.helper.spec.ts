/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fromStrings } from '../version.helper.js'

describe('version.helper', () => {

    describe('fromStrings', () => {

        it('should return the correct version', () => {
            expect(fromStrings('1', '2', '3')).toStrictEqual([1, 2, 3])
        })

        it('should return a NaN version if the version does not contain 3 integers', () => {
            expect(fromStrings('1', '2', 'c')).toStrictEqual([Number.NaN, Number.NaN, Number.NaN])
        })

    })

})
