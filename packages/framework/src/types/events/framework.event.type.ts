/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { EventDescriptions } from '@minimouli/ipc'
import type { Unit } from '@minimouli/types'
import type { FrameworkConfig } from '@minimouli/types/config'
import type { SuitePlanSynthesis, SuiteSynthesis, TestStatus } from '@minimouli/types/syntheses'

interface IssuedEvents extends EventDescriptions {
    'init:success': []
    'plan:result': [SuitePlanSynthesis[]]
    'run:result': [SuiteSynthesis[]]
    'test:launched': [string, string[]]
    'test:completed': [string, string[], TestStatus, Unit.ms]
}

interface ReceivedEvents extends EventDescriptions {
    init: [FrameworkConfig]
    plan: []
    run: []
}

export type {
    IssuedEvents,
    ReceivedEvents
}
