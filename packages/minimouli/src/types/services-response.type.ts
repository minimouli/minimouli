/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { DownloadingEvent, InstalledEvent } from './events/install-service.events.type.js'
import type { ResolvingMoulinetteEvent, ResolvingMoulinetteSourceEvent } from './events/resolve-service.events.type.js'
import type { Stage } from '../enums/stage.enum.js'

type ServicesResponse =
    | [Stage.Loading, Record<string, never>]
    | [Stage.ResolvingMoulinette, ResolvingMoulinetteEvent]
    | [Stage.ResolvingMoulinetteSource, ResolvingMoulinetteSourceEvent]
    | [Stage.Downloading, DownloadingEvent]
    | [Stage.Installing, Record<string, never>]
    | [Stage.Installed, InstalledEvent]
    | [Stage.Failed, { error: string }]

export type {
    ServicesResponse
}
