/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { TestSynthesis } from './test.synthesis.js'

interface SuiteSynthesis {
    name: string
    tests: TestSynthesis[]
    suites: SuiteSynthesis[]
}

export type {
    SuiteSynthesis
}
