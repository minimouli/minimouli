/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Path } from '@minimouli/fs'
import { Argument } from './Argument.js'

class PathArgument extends Argument<Path> {

    get content(): Path {

        if (this.internalContent === undefined)
            return Path.current()

        const content = this.internalContent.toString()

        if (content.startsWith('/'))
            return Path.fromAbsolute(content)

        return Path.fromRelative(Path.current(), content)
    }

}

export {
    PathArgument
}
