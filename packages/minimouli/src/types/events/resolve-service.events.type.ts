/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { MoulinetteEntity, MoulinetteResDto, MoulinetteSourceEntity, PagingResult } from '@minimouli/sdk'
import type { Callable } from '@minimouli/types'
import type { ServicesResponse } from '../services-response.type.js'

interface ResolvingMoulinetteEvent {
    pagingResult: PagingResult<MoulinetteResDto, MoulinetteEntity>
    select: Callable<[MoulinetteEntity]>
    inform: Callable<[string]>
    abort: Callable<[string]>
}

interface ResolvingMoulinetteSourceEvent {
    moulinette: MoulinetteEntity
    sources: MoulinetteSourceEntity[]
    select: Callable<[MoulinetteSourceEntity]>
    inform: Callable<[string]>
    abort: Callable<[string]>
}

interface MoulinetteResolvedEvent {
    moulinette: MoulinetteEntity
}

interface MoulinetteSourceResolvedEvent {
    moulinette: MoulinetteEntity
    moulinetteSource: MoulinetteSourceEntity
}

interface ResolveServiceEvents {
    resolvingMoulinette: Callable<[ResolvingMoulinetteEvent]>
    resolvingMoulinetteSource: Callable<[ResolvingMoulinetteSourceEvent]>
    moulinetteResolved: Callable<[MoulinetteResolvedEvent]>
    moulinetteSourceResolved: Callable<[MoulinetteSourceResolvedEvent]>
    change: Callable<[ServicesResponse]>
    info: Callable<[{ message: string }]>
    error: Callable<[Error]>
}

export type {
    ResolveServiceEvents,
    ResolvingMoulinetteEvent,
    ResolvingMoulinetteSourceEvent,
    MoulinetteResolvedEvent,
    MoulinetteSourceResolvedEvent
}
