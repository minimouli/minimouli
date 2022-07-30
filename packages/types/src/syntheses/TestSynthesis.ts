/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ms } from '../Unit.js'
import type { Hint } from '../hints'

enum TestStatus {
    SUCCESS = 'Status.SUCCESS',
    FAILURE = 'Status.FAILURE',
    UNDEFINED = 'Status.UNDEFINED'
}

interface TestSynthesis {
    name: string
    status: TestStatus
    duration: ms
    hint?: Hint
}

export {
    TestStatus
}
export type {
    TestSynthesis
}