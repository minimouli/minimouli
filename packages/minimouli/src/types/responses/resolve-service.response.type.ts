/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { MoulinetteEntity, MoulinetteResDto, MoulinetteSourceEntity, PagingResult } from '@minimouli/sdk'
import type { Callable } from '@minimouli/types'
import type { ResolveStage } from '../../enums/resolve-stage.enum.js'

type ResolveServiceResponse =
    | [ResolveStage.Loading, Record<string, never>]
    | [ResolveStage.ResolvingMoulinette, {
        pagingResult: PagingResult<MoulinetteResDto, MoulinetteEntity>
        select: Callable<[MoulinetteEntity]>
        abort: Callable<[string]>
    }]
    | [ResolveStage.ResolvingMoulinetteSource, {
        moulinette: MoulinetteEntity
        sources: MoulinetteSourceEntity[]
        select: Callable<[MoulinetteSourceEntity]>
        abort: Callable<[string]>
    }]
    | [ResolveStage.Resolved, {
        moulinette: MoulinetteEntity
        moulinetteSource: MoulinetteSourceEntity
    }]
    | [ResolveStage.Failed, { error: string }]

export type {
    ResolveServiceResponse
}
