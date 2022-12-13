/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { useAuth } from '@minimouli/hooks'
import { Box } from 'ink'
import React, { useEffect, useState } from 'react'
import { ErrorOverview } from '../ErrorOverview.js'
import { Loader } from '../Loader.js'
import { ResolveSource } from '../../enums/resolve-source.enum.js'
import { ResolveStage } from '../../enums/resolve-stage.enum.js'
import { ConfigService } from '../../services/config.service.js'
import { ResolveService } from '../../services/resolve.service.js'
import type { MoulinetteEntity, MoulinetteResDto, MoulinetteSourceEntity, PagingResult } from '@minimouli/sdk'
import type { Callable } from '@minimouli/types'
import type { ReactElement } from 'react'
import type { ResolveServiceResponse } from '../../types/responses/resolve-service.response.type.js'

type ResolveWorkflowProps =
    | {
        source: ResolveSource.Manual
        moulinetteId: string
        children: Callable<[MoulinetteEntity, MoulinetteSourceEntity], ReactElement>
    }
    | {
        source: ResolveSource.Parameters | ResolveSource.Scan
        organizationName: string
        projectName: string
        projectCycle: number
        isOfficial: boolean
        children: Callable<[MoulinetteEntity, MoulinetteSourceEntity], ReactElement>
    }

interface MoulinetteResolverProps {
    pagingResult: PagingResult<MoulinetteResDto, MoulinetteEntity>
    select: Callable<[MoulinetteEntity]>
    abort: Callable<[string]>
}

interface MoulinetteSourceResolverProps {
    sources: MoulinetteSourceEntity[]
    select: Callable<[MoulinetteSourceEntity]>
    abort: Callable<[string]>
}

const ResolveWorkflow = ({ children, ...parameters }: ResolveWorkflowProps) => {

    const { client } = useAuth()

    const resolveService = useInjectable(ResolveService, {
        createNewInstance: true
    })

    const [response, setResponse] = useState<ResolveServiceResponse>([ResolveStage.Loading, {}])
    const [stage, data] = response

    useEffect(() => {

        resolveService.on('change', setResponse)
        resolveService.on('error', () => {})

        void (async () => {
            switch (parameters.source) {
                case ResolveSource.Manual: {

                    const { moulinetteId } = parameters

                    await resolveService.resolveMoulinetteSourceByMoulinetteId(client, moulinetteId)
                    break
                }
                case ResolveSource.Parameters:
                case ResolveSource.Scan: {

                    const { organizationName, projectName, projectCycle, isOfficial } = parameters

                    await resolveService.resolveMoulinetteByListParameters(client, {
                        organizationName,
                        projectName,
                        projectCycle,
                        isOfficial
                    })
                    break
                }
                default:
            }
        })()

        return () => client.abortAllRequests()
    }, [])

    return (
        <Box>
            {stage === ResolveStage.ResolvingMoulinette && (
                <MoulinetteResolver
                    pagingResult={data.pagingResult}
                    select={data.select}
                    abort={data.abort} />
            )}

            {stage === ResolveStage.ResolvingMoulinetteSource && (
                <MoulinetteSourceResolver
                    sources={data.sources}
                    select={data.select}
                    abort={data.abort} />
            )}

            {stage === ResolveStage.Resolved && (
                children(data.moulinette, data.moulinetteSource)
            )}

            {stage === ResolveStage.Failed && (
                <ErrorOverview error={data.error} />
            )}
        </Box>
    )
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
    ResolveWorkflow
}
