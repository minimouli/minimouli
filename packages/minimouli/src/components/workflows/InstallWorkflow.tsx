/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { Path } from '@minimouli/fs'
import { useAuth } from '@minimouli/hooks'
import { Box, Text } from 'ink'
import React, { useEffect, useState } from 'react'
import { ErrorOverview } from '../ErrorOverview.js'
import { Loader } from '../Loader.js'
import { Stage } from '../../enums/stage.enum.js'
import { ConfigService } from '../../services/config.service.js'
import { InstallService } from '../../services/install.service.js'
import { RegistryService } from '../../services/registry.service.js'
import { ResolveService } from '../../services/resolve.service.js'
import type { ServicesResponse } from '../../types/services-response.type.js'
import type { InstalledEvent } from '../../types/events/install-service.events.type.js'
import type {
    MoulinetteSourceResolvedEvent,
    ResolvingMoulinetteEvent,
    ResolvingMoulinetteSourceEvent
} from '../../types/events/resolve-service.events.type.js'

interface InstallWorkflowProps {
    organizationName: string
    projectName: string
    projectCycle: number
    isOfficial: boolean
}

const InstallWorkflow = ({
    organizationName,
    projectName,
    projectCycle,
    isOfficial
}: InstallWorkflowProps) => {

    const { client } = useAuth()

    const configService = useInjectable(ConfigService)
    const registryService = useInjectable(RegistryService)
    const resolveService = useInjectable(ResolveService, {
        createNewInstance: true
    })
    const installService = useInjectable(InstallService, {
        createNewInstance: true
    })

    const [info, setInfo] = useState<string | undefined>()
    const [response, setResponse] = useState<ServicesResponse>([Stage.Loading, {}])
    const [stage, data] = response

    const handleResolvingMoulinette = ({
        pagingResult, select, abort
    }: ResolvingMoulinetteEvent) => {

        const firstMoulinette = pagingResult.items.at(0)

        if (firstMoulinette === undefined) {
            abort(`The ${projectName} project does not seem to be supported by ${configService.config.app.name}`)
            return
        }

        select(firstMoulinette)
    }

    const handleResolvingMoulinetteSource = ({
        moulinette, sources, select, inform, abort
    }: ResolvingMoulinetteSourceEvent) => {

        const lastMoulinetteSource = sources.at(0)

        if (lastMoulinetteSource === undefined) {
            abort(`The ${projectName} project does not seem to be supported by ${configService.config.app.name}`)
            return
        }

        const entry = registryService.findByIdAndVersion(moulinette.id, lastMoulinetteSource.version)

        if (entry !== undefined) {
            inform(`The ${projectName} moulinette is already installed`)
            setResponse([Stage.Installed, {
                moulinette,
                moulinetteSource: lastMoulinetteSource,
                moulinettePath: Path.fromAbsolute(entry.path)
            }])
            return
        }

        select(lastMoulinetteSource)
    }

    const handleMoulinetteSourceResolved = ({ moulinette, moulinetteSource }: MoulinetteSourceResolvedEvent) => {
        void (async () => {
            await installService.install(moulinette, moulinetteSource)
        })()
    }

    const handleInstalled = ({ moulinette, moulinetteSource, moulinettePath }: InstalledEvent) => {
        void (async () => {
            registryService.insert({
                id: moulinette.id,
                version: moulinetteSource.version,
                path: moulinettePath.toString(),
                rules: moulinetteSource.rules,
                checksum: moulinetteSource.checksum,
                information: {
                    organization: {
                        name: organizationName
                    },
                    project: {
                        name: projectName,
                        cycle: projectCycle
                    }
                },
                installedAt: new Date().toISOString()
            })
            await registryService.save()
        })()
    }

    useEffect(() => {

        if (projectName === '' || organizationName === '')
            return

        resolveService.on('resolvingMoulinette', handleResolvingMoulinette)
        resolveService.on('resolvingMoulinetteSource', handleResolvingMoulinetteSource)
        resolveService.on('moulinetteSourceResolved', handleMoulinetteSourceResolved)

        installService.on('installed', handleInstalled)

        resolveService.on('info', ({ message }) => setInfo(message))

        resolveService.on('change', setResponse)
        installService.on('change', setResponse)

        resolveService.on('error', () => {})
        installService.on('error', () => {})

        void (async () => {
            await resolveService.resolveMoulinette(client, {
                organizationName,
                projectName,
                projectCycle,
                isOfficial
            })
        })()

        return () => {
            client.abortAllRequests()
            installService.abortAllRequests()
        }
    }, [])

    return (
        <Box>
            {stage === Stage.ResolvingMoulinette && (
                <Loader message="🔍 Resolving" />
            )}

            {stage === Stage.ResolvingMoulinetteSource && (
                <Loader message="🔍 Resolving" />
            )}

            {stage === Stage.Downloading && (
                data.completed !== undefined
                    ? <Loader message={`🚚 Downloading ${Math.round(data.completed * 100)}%`} />
                    : <Loader message="🚚 Downloading" />
            )}

            {stage === Stage.Installing && (
                <Loader message="🔨 Installing" />
            )}

            {stage === Stage.Installed && (
                <Text>
                    <Text>
                        { info !== undefined ? info : `Successfully installed the ${data.moulinette.project.name} moulinette` }
                    </Text>
                    <Text> </Text>
                    <Text dimColor >({data.moulinette.id}@{data.moulinetteSource.version.join('.')})</Text>
                </Text>
            )}

            {stage === Stage.Failed && (
                <ErrorOverview error={data.error} />
            )}

            {(projectName === '' || organizationName === '') && (
                <ErrorOverview error="The specified project name or organization name is empty" />
            )}
        </Box>
    )
}

export {
    InstallWorkflow
}
