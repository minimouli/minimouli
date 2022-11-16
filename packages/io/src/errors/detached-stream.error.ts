/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { StreamError } from './stream-error.js'

class DetachedStreamError extends StreamError {

    constructor() {
        super('The stream is detached')
    }

}

export {
    DetachedStreamError
}
