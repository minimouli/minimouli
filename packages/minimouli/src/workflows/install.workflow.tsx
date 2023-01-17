/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { useAuth } from '@minimouli/hooks'
import { isMinimouliClientError } from '@minimouli/sdk'
import { Box } from 'ink'
import React, { useEffect, useState } from 'react'
import { InstallStage } from '../enums/install-stage.enum.js'
import { Loader } from '../components/Loader.js'
import { InstallService } from '../services/install.service.js'
import { RegistryService } from '../services/registry.service.js'
import type { MoulinetteEntity, MoulinetteSourceEntity } from '@minimouli/sdk'
import type { Path } from '@minimouli/fs'
import type { With } from '../types/with.type.js'
import type { InstalledEvent } from '../types/events/install-service.events.type.js'
import type { InstallServiceResponse } from '../types/responses/install-service.response.type.js'

interface InstallWorkflowProps {
    moulinette: MoulinetteEntity
    moulinetteSource: MoulinetteSourceEntity
}

interface InstallChildProps {
    moulinette: MoulinetteEntity
    moulinetteSource: MoulinetteSourceEntity
    moulinettePath: Path
}

type WithInstall = With<InstallWorkflowProps, InstallChildProps>

const withInstall: WithInstall = (Child) => ({ moulinette, moulinetteSource }) => {

    const { client } = useAuth()

    const registryService = useInjectable(RegistryService)
    const installService = useInjectable(InstallService, {
        createNewInstance: true
    })

    const [error, setError] = useState<string | undefined>()
    const [response, setResponse] = useState<InstallServiceResponse>([InstallStage.Loading, {}])
    const [stage, data] = response

    const handleInstalled = ({ moulinettePath }: InstalledEvent) => {
        void (async () => {
            try {

                if (moulinette.project === undefined) {
                    setError('Unable to retrieve the project')
                    return
                }

                const project = await client.projects.get(moulinette.project.id)
                const organization = project.organization

                if (organization === undefined) {
                    setError('Unable to retrieve the organization')
                    return
                }

                const entry = {
                    id: moulinette.id,
                    version: moulinetteSource.version,
                    path: moulinettePath.toString(),
                    rules: moulinetteSource.rules,
                    checksum: moulinetteSource.checksum,
                    isOfficial: moulinette.isOfficial,
                    organization: {
                        name: organization.name
                    },
                    project: {
                        name: project.name,
                        cycle: project.cycle
                    },
                    installedAt: new Date().toISOString()
                }

                registryService.insert(entry)
                await registryService.save()

            } catch (error_: unknown) {

                if (isMinimouliClientError(error_)) {
                    setError(`Unable to retrieve the project (status: ${error_.statusCode})`)
                    return
                }

                setError('Unable to save the moulinette in the local registry')
            }
        })()
    }

    useEffect(() => {

        installService.on('installed', handleInstalled)
        installService.on('change', setResponse)
        installService.on('error', () => {})

        void (async () => {
            await installService.install(moulinette, moulinetteSource)
        })()

        return () => {
            client.abortAllRequests()
            installService.abortAllRequests()
        }
    }, [])

    if (stage === InstallStage.Failed)
        throw new Error(data.error)

    if (error !== undefined)
        throw new Error(error)

    return (
        <Box>
            {stage === InstallStage.Downloading && (
                data.completed !== undefined
                    ? <Loader message={`🚚 Downloading ${Math.round(data.completed * 100)}%`} />
                    : <Loader message="🚚 Downloading" />
            )}

            {stage === InstallStage.Installing && (
                <Loader message="🔨 Installing" />
            )}

            {stage === InstallStage.Installed && (
                <Child {...data} />
            )}
        </Box>
    )
}

export {
    withInstall
}
