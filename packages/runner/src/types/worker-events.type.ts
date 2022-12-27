/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Callable, Unit } from '@minimouli/types'
import type { TestStatus } from '@minimouli/types/syntheses'

interface WorkerEvents {
    'test:launched': Callable<[{
        workerId: number
        name: string
        path: string[]
    }]>
    'test:completed': Callable<[{
        workerId: number
        name: string
        path: string[]
        status: TestStatus
        duration: Unit.ms
    }]>
}

export type {
    WorkerEvents
}
