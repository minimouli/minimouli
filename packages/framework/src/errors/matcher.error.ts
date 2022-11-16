/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HintStatus, HintType } from '@minimouli/types/hints'
import { FrameworkError } from './framework.error.js'

class MatcherError extends FrameworkError {

    constructor(message: string) {
        super({
            type: HintType.MATCHER_ERROR,
            status: HintStatus.FAILURE,
            message
        })
    }

}

export {
    MatcherError
}
