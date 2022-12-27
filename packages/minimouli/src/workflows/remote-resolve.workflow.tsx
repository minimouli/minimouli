/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react'
import { useAuth } from '@minimouli/hooks'
import { useInjectable } from '@minimouli/console'
import { Box } from 'ink'
import { withScan } from './scan.workflow.js'
import { ResolveStage } from '../enums/resolve-stage.enum.js'
import { ResolveSource } from '../enums/resolve-source.enum.js'
import { MoulinetteResolver } from '../components/MoulinetteResolver.js'
import { MoulinetteSourceResolver } from '../components/MoulinetteSourceResolver.js'
import { Loader } from '../components/Loader.js'
import { ConfigService } from '../services/config.service.js'
import { ResolveService } from '../services/resolve.service.js'
import type { Path } from '@minimouli/fs'
import type { MoulinetteEntity, MoulinetteSourceEntity } from '@minimouli/sdk'
import type { Version } from '@minimouli/types'
import type { MoulinetteResolverProps } from '../components/MoulinetteResolver.js'
import type { MoulinetteSourceResolverProps } from '../components/MoulinetteSourceResolver.js'
import type { With } from '../types/with.type.js'
import type { ResolveServiceResponse } from '../types/responses/resolve-service.response.type.js'

interface ManualRemoteResolveWorkflowProps {
    moulinetteId: string
    moulinetteVersion: Version
}

interface ParametersRemoteResolveWorkflowProps {
    organizationName: string
    projectName: string
    projectCycle?: number
    isOfficial?: boolean
}

interface ScanRemoteResolveWorkflowProps {
    directory: Path
}

type RemoteResolveWorkflowProps =
    | ManualRemoteResolveWorkflowProps & { source: ResolveSource.Manual }
    | ParametersRemoteResolveWorkflowProps & { source: ResolveSource.Parameters }
    | ScanRemoteResolveWorkflowProps & { source: ResolveSource.Scan }

type RemoteResolveChildProps =
    | {
        moulinette: MoulinetteEntity
        moulinetteSource: MoulinetteSourceEntity
    }

type WithRemoteResolve = With<RemoteResolveWorkflowProps, RemoteResolveChildProps>
type WithManualRemoteResolve = With<ManualRemoteResolveWorkflowProps, RemoteResolveChildProps>
type WithParametersRemoteResolve = With<ParametersRemoteResolveWorkflowProps, RemoteResolveChildProps>
type WithScanRemoteResolve = With<ScanRemoteResolveWorkflowProps, RemoteResolveChildProps>

const withRemoteResolve: WithRemoteResolve = (Child) => (props) => {

    const ManualRemoteResolveWorkflow = withManualRemoteResolve(Child)
    const ParametersRemoteResolveWorkflow = withParametersRemoteResolve(Child)
    const ScanRemoteResolveWorkflow = withScanParametersRemoteResolve(Child)

    switch (props.source) {
        case ResolveSource.Manual:
            return <ManualRemoteResolveWorkflow {...props} />

        case ResolveSource.Parameters:
            return <ParametersRemoteResolveWorkflow {...props} />

        case ResolveSource.Scan:
            return <ScanRemoteResolveWorkflow {...props} />

        default:
            // eslint-disable-next-line unicorn/no-null
            return null
    }
}

const withManualRemoteResolve: WithManualRemoteResolve = (Child) => ({
    moulinetteId,
    moulinetteVersion
}) => {

    const { client } = useAuth()

    const configService = useInjectable(ConfigService)
    const resolveService = useInjectable(ResolveService, {
        createNewInstance: true
    })

    const [response, setResponse] = useState<ResolveServiceResponse>([ResolveStage.Loading, {}])
    const [stage, data] = response

    const handleChange = (response_: ResolveServiceResponse) => {

        const [stage_, data_] = response_

        if (stage_ === ResolveStage.ResolvingMoulinette)
            handleResolveMoulinette(data_)

        if (stage_ === ResolveStage.ResolvingMoulinetteSource)
            handleResolveMoulinetteSource(data_)

        setResponse(response_)
    }

    const handleResolveMoulinette = ({ pagingResult, select, abort }: MoulinetteResolverProps) => {

        const firstMoulinette = pagingResult.items.at(0)

        if (firstMoulinette === undefined) {
            abort(`The project does not seem to be supported by ${configService.config.app.name}`)
            return
        }

        select(firstMoulinette)
    }

    const handleResolveMoulinetteSource = ({ sources, select, abort }: MoulinetteSourceResolverProps) => {

        const matchingMoulinetteSource = sources.find(({ version }) => version.every((element, index) => element === moulinetteVersion[index]))

        if (matchingMoulinetteSource === undefined) {
            abort(`The project does not seem to be supported by ${configService.config.app.name}`)
            return
        }

        select(matchingMoulinetteSource)
    }

    useEffect(() => {

        resolveService.on('change', handleChange)
        resolveService.on('error', () => {})

        void (async () => {
            await resolveService.resolveMoulinetteSourceByMoulinetteId(client, moulinetteId)
        })()

        return () => client.abortAllRequests()
    }, [])

    if (stage === ResolveStage.Failed)
        throw new Error(data.error)

    return (
        <Box>
            {stage === ResolveStage.ResolvingMoulinette && (
                <Loader message="🔍 Resolving" />
            )}

            {stage === ResolveStage.ResolvingMoulinetteSource && (
                <Loader message="🔍 Resolving" />
            )}

            {stage === ResolveStage.Resolved && (
                <Child {...data } />
            )}
        </Box>
    )
}

const withParametersRemoteResolve: WithParametersRemoteResolve = (Child) => ({
    organizationName,
    projectName,
    projectCycle,
    isOfficial
}) => {

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
            await resolveService.resolveMoulinetteByListParameters(client, {
                organizationName, projectName, projectCycle, isOfficial
            })
        })()

        return () => client.abortAllRequests()
    }, [])

    if (stage === ResolveStage.Failed)
        throw new Error(data.error)

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
                <Child {...data } />
            )}
        </Box>
    )
}

const withScanParametersRemoteResolve: WithScanRemoteResolve = (Child) => ({ directory }) => {

    const ParametersRemoteResolveWorkflow = withParametersRemoteResolve(Child)
    const ScanWorkflow = withScan(({ organization, project }) => (
        <ParametersRemoteResolveWorkflow
            organizationName={organization.name}
            projectName={project.name}
        />
    ))

    return <ScanWorkflow directory={directory} />
}

export {
    withRemoteResolve
}
