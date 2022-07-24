/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Unit } from '@minimouli/types'
import type { Sleep } from '@minimouli/types/blocks.js'

const sleep: Sleep = (duration: Unit.ms) => new Promise((resolve) => setTimeout(resolve, duration))

export {
    sleep
}
