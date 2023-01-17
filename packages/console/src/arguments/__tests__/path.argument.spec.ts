/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Path } from '@minimouli/fs'
import { PathArgument } from '../path.argument.js'

describe('PathArgument', () => {

    describe('content', () => {

        const path = Path.fromAbsolute('/')
        const pathCurrent = jest.spyOn(Path, 'current')
        const pathFromAbsolute = jest.spyOn(Path, 'fromAbsolute')
        const pathFromRelative = jest.spyOn(Path, 'fromRelative')
        const pathToString = jest.spyOn(path, 'toString')

        beforeEach(() => {
            pathCurrent.mockReset()
            pathFromAbsolute.mockReset()
            pathFromRelative.mockReset()
            pathToString.mockReset()

            pathCurrent.mockReturnValue(path)
            pathFromAbsolute.mockReturnValue(path)
            pathFromRelative.mockReturnValue(path)
        })

        it('should return the current path if the internal content is undefined', () => {

            const result = 'return value'
            pathToString.mockReturnValue(result)

            const argument = new PathArgument('test')

            expect(argument.content.toString()).toBe(result)
            expect(pathCurrent).toHaveBeenCalled()
            expect(pathFromAbsolute).not.toHaveBeenCalled()
            expect(pathFromRelative).not.toHaveBeenCalled()
        })

        it('should return an absolute path if the internal content starts with a /', () => {

            const result = 'return value'
            const content = '/home'
            pathToString.mockReturnValue(result)

            const argument = new PathArgument('test')
            argument.setContent(content)

            expect(argument.content.toString()).toBe(result)
            expect(pathFromAbsolute).toHaveBeenCalledWith(content)
            expect(pathCurrent).not.toHaveBeenCalled()
            expect(pathFromRelative).not.toHaveBeenCalled()
        })

        it('should return an relative path if the internal content does not starts with a /', () => {

            const result = 'return value'
            const content = '../my-project'
            pathToString.mockReturnValue(result)

            const argument = new PathArgument('test')
            argument.setContent(content)

            expect(argument.content.toString()).toBe(result)
            expect(pathFromRelative).toHaveBeenCalledWith(path, content)
            expect(pathCurrent).toHaveBeenCalled()
            expect(pathFromAbsolute).not.toHaveBeenCalled()
        })

    })

})
