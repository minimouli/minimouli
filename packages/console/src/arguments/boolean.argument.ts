/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Argument } from './Argument.js'

class BooleanArgument extends Argument<boolean> {

    get content(): boolean {

        if (this.internalContent === true)
            return true

        if (this.internalContent === 'true')
            return true

        return this.internalContent === ''
    }

    override validate(content: string | undefined): boolean {

        if (!super.validate(content))
            return false

        if (content === undefined)
            return true

        if (content === 'true')
            return true

        if (content === 'false')
            return true

        return content === ''
    }

}

export {
    BooleanArgument
}
