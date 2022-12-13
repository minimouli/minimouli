/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Path } from '@minimouli/fs'
import type { MoulinetteEntity, MoulinetteSourceEntity } from '@minimouli/sdk'
import type { Callable } from '@minimouli/types'
import type { InstallServiceResponse } from '../responses/install-service.response.type.js'

interface InstalledEvent {
    moulinette: MoulinetteEntity
    moulinetteSource: MoulinetteSourceEntity
    moulinettePath: Path
}

interface InstallServiceEvents {
    change: Callable<[InstallServiceResponse]>
    installed: Callable<[InstalledEvent]>
    error: Callable<[Error]>
}

export type {
    InstallServiceEvents,
    InstalledEvent
}
