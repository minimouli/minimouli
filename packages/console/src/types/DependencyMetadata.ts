/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Class } from './Class.js'

interface DependencyMetadata {
    token: Class
    index: number
}

export type {
    DependencyMetadata
}
