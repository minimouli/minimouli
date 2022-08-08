/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ChannelEvents } from './Channel.js'

interface Message<T extends ChannelEvents> {
    event: keyof T
    args: unknown[]
}

export type {
    Message
}
