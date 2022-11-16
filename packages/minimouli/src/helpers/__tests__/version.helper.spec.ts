/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { toString } from '../version.helper.js'

describe('version.helper', () => {

    describe('toString', () => {

        it('return the string format of the version', () => {
            expect(toString([1, 2, 3])).toBe('1.2.3')
        })

    })

})
