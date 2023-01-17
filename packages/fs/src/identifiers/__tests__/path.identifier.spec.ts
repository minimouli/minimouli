/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Path } from '../path.identifier.js'

describe('Path', () => {

    describe('fromAbsolute', () => {

        it('should return an absolute path', () => {

            const path = Path.fromAbsolute('/one/two/three')

            expect(path.toString()).toBe('/one/two/three')
        })

        it('should return a resolved absolute path', () => {

            const path = Path.fromAbsolute('/one///two/../three/./four/')

            expect(path.toString()).toBe('/one/three/four')
        })

    })

    describe('fromRelative', () => {

        it('should return a relative path', () => {

            const base = Path.fromAbsolute('/one/two')
            const path = Path.fromRelative(base, '/three/four')

            expect(path.toString()).toBe('/one/two/three/four')
        })

        it('should return a resolved relative path', () => {

            const base = Path.fromAbsolute('/one/two')
            const path = Path.fromRelative(base, '../three//four/.')

            expect(path.toString()).toBe('/one/three/four')
        })

    })

    describe('join', () => {

        it('should join the two paths', () => {

            const base = Path.fromAbsolute('/one/two')
            const path = base.join('/three/four')

            expect(path.toString()).toBe('/one/two/three/four')
        })

    })

})
