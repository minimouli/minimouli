/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Descriptor } from '../stream/index.js'

interface WaitOptions {
    descriptor: Descriptor.Stdout | Descriptor.Stderr
}

export type {
    WaitOptions
}
