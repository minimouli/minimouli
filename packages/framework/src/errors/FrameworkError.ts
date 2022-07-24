/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Hint } from '@minimouli/types/hints.js'

class FrameworkError extends Error {

    constructor(public readonly hint: Hint) {
        super()
    }

}

export {
    FrameworkError
}
