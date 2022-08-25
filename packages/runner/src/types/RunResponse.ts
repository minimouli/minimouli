/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuiteSynthesis } from '@minimouli/types/syntheses.js'

interface RunSuccessResponse {
    syntheses: SuiteSynthesis[]
    error: undefined
}

interface RunFailureResponse {
    syntheses: undefined
    error: string
}

type RunResponse = RunSuccessResponse | RunFailureResponse

export type {
    RunResponse
}
