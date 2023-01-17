/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface SuitePlanSynthesis {
    name: string
    tests: string[]
    suites: SuitePlanSynthesis[]
}

export type {
    SuitePlanSynthesis
}
