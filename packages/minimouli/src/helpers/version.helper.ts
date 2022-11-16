/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Version } from '@minimouli/types'

const toString = ([major, minor, patch]: Version): string => `${major}.${minor}.${patch}`

export {
    toString
}
