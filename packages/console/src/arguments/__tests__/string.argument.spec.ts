/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StringArgument } from '../string.argument.js'

describe('StringArgument', () => {

    describe('content', () => {

        it('should return the internal content if not undefined', () => {

            const argument = new StringArgument('test')
            argument.setContent('hello world')

            expect(argument.content).toBe('hello world')
        })

        it('should return an empty string if the internal content is undefined', () => {

            const argument = new StringArgument('test')

            expect(argument.content).toBe('')
        })

    })

})
