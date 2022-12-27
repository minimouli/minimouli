/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import React, { useEffect } from 'react'
import { Loader } from './Loader.js'
import { ConfigService } from '../services/config.service.js'
import type { MoulinetteEntity, MoulinetteResDto, PagingResult } from '@minimouli/sdk'
import type { Callable } from '@minimouli/types'

interface MoulinetteResolverProps {
    pagingResult: PagingResult<MoulinetteResDto, MoulinetteEntity>
    select: Callable<[MoulinetteEntity]>
    abort: Callable<[string]>
}

const MoulinetteResolver = ({ pagingResult, select, abort }: MoulinetteResolverProps) => {

    const configService = useInjectable(ConfigService)

    useEffect(() => {

        const firstMoulinette = pagingResult.items.at(0)

        if (firstMoulinette === undefined) {
            abort(`The project does not seem to be supported by ${configService.config.app.name}`)
            return
        }

        select(firstMoulinette)
    }, [])

    return (
        <Loader message="🔍 Resolving" />
    )
}

export {
    MoulinetteResolver
}
export type {
    MoulinetteResolverProps
}
