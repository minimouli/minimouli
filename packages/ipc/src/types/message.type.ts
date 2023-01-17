/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { EventDescriptions } from '../channel.js'

/* Event and args properties are unrelated, use it with caution */
interface Message<Descriptions extends EventDescriptions> {
    event: keyof Descriptions
    args: Descriptions[keyof Descriptions]
}

export type {
    Message
}
