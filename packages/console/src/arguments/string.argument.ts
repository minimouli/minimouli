/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Argument } from './argument.js'

class StringArgument extends Argument<string> {

    get content(): string {
        return this.internalContent ?? ''
    }

}

export {
    StringArgument
}
