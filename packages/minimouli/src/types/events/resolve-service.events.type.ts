/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Callable } from '@minimouli/types'
import type { ResolveServiceResponse } from '../responses/resolve-service.response.type.js'

interface ResolveServiceEvents {
    change: Callable<[ResolveServiceResponse]>
    error: Callable<[Error]>
}

export type {
    ResolveServiceEvents
}
