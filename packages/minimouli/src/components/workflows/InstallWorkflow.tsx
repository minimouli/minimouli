/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { Path } from '@minimouli/fs'
import { useAuth } from '@minimouli/hooks'
import { isMinimouliClientError } from '@minimouli/sdk'
import { Box, Text } from 'ink'
import React, { useEffect, useState } from 'react'
import { ErrorOverview } from '../ErrorOverview.js'
import { Loader } from '../Loader.js'
import { InstallStage } from '../../enums/install-stage.enum.js'
import { InstallService } from '../../services/install.service.js'
import { RegistryService } from '../../services/registry.service.js'
import type { InstalledEvent } from '../../types/events/install-service.events.type.js'
import type { MoulinetteEntity, MoulinetteSourceEntity } from '@minimouli/sdk'
import type { InstallServiceResponse } from '../../types/responses/install-service.response.type.js'

interface InstallWorkflowProps {
    moulinette: MoulinetteEntity
    moulinetteSource: MoulinetteSourceEntity
}

const InstallWorkflow = ({ moulinette, moulinetteSource }: InstallWorkflowProps) => {

    const { client } = useAuth()

    const registryService = useInjectable(RegistryService)
    const installService = useInjectable(InstallService, {
        createNewInstance: true
    })

    const [info, setInfo] = useState<string | undefined>()
    const [error, setError] = useState<string | undefined>()
    const [response, setResponse] = useState<InstallServiceResponse>([InstallStage.Loading, {}])
    const [stage, data] = response

    const handleInstalled = ({ moulinettePath }: InstalledEvent) => {
        void (async () => {
            try {

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
                    information: {
                        organization: {
                            name: organization.name
                        },
                        project: {
                            name: project.name,
                            cycle: project.cycle
                        }
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

            const entry = registryService.findByIdAndVersion(moulinette.id, moulinetteSource.version)

            if (entry !== undefined) {
                setInfo('The moulinette is already installed')
                setResponse([InstallStage.Installed, {
                    moulinette,
                    moulinetteSource,
                    moulinettePath: Path.fromAbsolute(entry.path)
                }])
                return
            }

            await installService.install(moulinette, moulinetteSource)
        })()

        return () => {
            client.abortAllRequests()
            installService.abortAllRequests()
        }
    }, [])

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
                <Text>
                    <Text>
                        { info !== undefined ? info : `Successfully installed the ${data.moulinette.project.name} moulinette` }
                    </Text>
                    <Text> </Text>
                    <Text dimColor >({data.moulinette.id}@{data.moulinetteSource.version.join('.')})</Text>
                </Text>
            )}

            {stage === InstallStage.Failed && (
                <ErrorOverview error={data.error} />
            )}

            {error !== undefined && (
                <ErrorOverview error={error} />
            )}
        </Box>
    )
}

export {
    InstallWorkflow
}
