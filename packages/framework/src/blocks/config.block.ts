/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Tree } from '../tree/tree.js'
import type { Config } from '@minimouli/types/blocks'
import type { ContextConfig } from '@minimouli/types/config'

const config: Config = (options: Partial<ContextConfig>) => {
    Tree.currentContext().setConfiguration(options)
}

export {
    config
}
