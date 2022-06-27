/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Descriptor } from '../stream'

interface MatcherOutputOptions {
    descriptor: Descriptor.STDOUT | Descriptor.STDERR
    start: number
    end: number
}

export type {
    MatcherOutputOptions
}
