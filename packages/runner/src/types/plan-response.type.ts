/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuitePlanSynthesis } from '@minimouli/types/syntheses'

type PlanResponse =
    | {
        syntheses: SuitePlanSynthesis[]
        error?: undefined
    }
    | {
        error: string
        syntheses?: undefined
    }

export type {
    PlanResponse
}
