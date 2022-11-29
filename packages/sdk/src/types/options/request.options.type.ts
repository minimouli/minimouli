/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Callable } from '@minimouli/types'

interface RequestOptions {
    headers: Record<string, string>
    body: Record<string, unknown>
    validateStatus: Callable<[number], boolean>
}

export type {
    RequestOptions
}
