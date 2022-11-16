/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuiteSynthesisPlan } from '@minimouli/types/syntheses'

interface PlanSuccessResponse {
    syntheses: SuiteSynthesisPlan[]
    error: undefined
}

interface PlanFailureResponse {
    syntheses: undefined
    error: string
}

type PlanResponse = PlanSuccessResponse | PlanFailureResponse

export type {
    PlanResponse
}
