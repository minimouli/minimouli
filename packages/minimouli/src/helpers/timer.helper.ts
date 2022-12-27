/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Unit } from '@minimouli/types'

const format = (duration: Unit.ms): string => {
    const seconds = duration / 1000
    return `${seconds.toFixed(1)}s`
}

export {
    format
}
