/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Path } from '@minimouli/fs'
import type { MoulinetteEntity, MoulinetteSourceEntity } from '@minimouli/sdk'
import type { Callable } from '@minimouli/types'
import type { ServicesResponse } from '../services-response.type.js'

interface DownloadingEvent {
    loaded: number
    completed: number | undefined
    total: number | undefined
}

interface InstalledEvent {
    moulinette: MoulinetteEntity
    moulinetteSource: MoulinetteSourceEntity
    moulinettePath: Path
}

interface InstallServiceEvents {
    downloading: Callable<[DownloadingEvent]>
    installing: Callable
    installed: Callable<[InstalledEvent]>
    change: Callable<[ServicesResponse]>
    info: Callable<[{ message: string }]>
    error: Callable<[Error]>
}

export type {
    InstallServiceEvents,
    DownloadingEvent,
    InstalledEvent
}
