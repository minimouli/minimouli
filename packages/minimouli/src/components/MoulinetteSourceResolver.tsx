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
import type { MoulinetteSourceEntity } from '@minimouli/sdk'
import type { Callable } from '@minimouli/types'

interface MoulinetteSourceResolverProps {
    sources: MoulinetteSourceEntity[]
    select: Callable<[MoulinetteSourceEntity]>
    abort: Callable<[string]>
}

const MoulinetteSourceResolver = ({ sources, select, abort }: MoulinetteSourceResolverProps) => {

    const configService = useInjectable(ConfigService)

    useEffect(() => {

        const lastMoulinetteSource = sources.at(0)

        if (lastMoulinetteSource === undefined) {
            abort(`The project does not seem to be supported by ${configService.config.app.name}`)
            return
        }

        select(lastMoulinetteSource)
    }, [])

    return (
        <Loader message="🔍 Resolving" />
    )
}

export {
    MoulinetteSourceResolver
}
export type {
    MoulinetteSourceResolverProps
}
