/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Readable } from './Readable.js'
import type { Writable } from './Writable.js'

interface Duplex extends Readable, Writable {}

export type {
    Duplex
}
