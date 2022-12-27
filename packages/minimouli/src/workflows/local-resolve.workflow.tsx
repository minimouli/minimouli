/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import React, { useEffect, useState } from 'react'
import { withScan } from './scan.workflow.js'
import { ResolveSource } from '../enums/resolve-source.enum.js'
import { RegistryService } from '../services/registry.service.js'
import type { Path } from '@minimouli/fs'
import type { Version } from '@minimouli/types'
import type { RegistryEntry } from '../types/registry.type.js'
import type { With } from '../types/with.type.js'

interface ManualLocalResolveWorkflowProps {
    moulinetteId: string
    moulinetteVersion: Version
}

interface ParametersLocalResolveWorkflowProps {
    organizationName: string
    projectName: string
    projectCycle?: number
    isOfficial?: boolean
}

interface ScanLocalResolveWorkflowProps {
    directory: Path
}

type LocalResolveWorkflowProps =
    | ManualLocalResolveWorkflowProps & { source: ResolveSource.Manual }
    | ParametersLocalResolveWorkflowProps & { source: ResolveSource.Parameters }
    | ScanLocalResolveWorkflowProps & { source: ResolveSource.Scan }

interface LocalResolveChildProps {
    registryEntry: RegistryEntry | undefined
}

type WithLocalResolve = With<LocalResolveWorkflowProps, LocalResolveChildProps>
type WithManualLocalResolve = With<ManualLocalResolveWorkflowProps, LocalResolveChildProps>
type WithParametersLocalResolve = With<ParametersLocalResolveWorkflowProps, LocalResolveChildProps>
type WithScanLocalResolve = With<ScanLocalResolveWorkflowProps, LocalResolveChildProps>

const withLocalResolve: WithLocalResolve = (Child) => (props) => {

    const ManualLocalResolveWorkflow = withManualLocalResolve(Child)
    const ParametersLocalResolveWorkflow = withParametersLocalResolve(Child)
    const ScanLocalResolveWorkflow = withScanLocalResolve(Child)

    switch (props.source) {
        case ResolveSource.Manual:
            return <ManualLocalResolveWorkflow {...props} />

        case ResolveSource.Parameters:
            return <ParametersLocalResolveWorkflow {...props} />

        case ResolveSource.Scan:
            return <ScanLocalResolveWorkflow {...props} />

        default:
            // eslint-disable-next-line unicorn/no-null
            return null
    }
}

const withManualLocalResolve: WithManualLocalResolve = (Child) => ({
    moulinetteId,
    moulinetteVersion
}) => {

    const registryService = useInjectable(RegistryService)
    const [registryEntry, setRegistryEntry] = useState<RegistryEntry | undefined>()
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {
        setRegistryEntry(registryService.findByIdAndVersion(moulinetteId, moulinetteVersion))
        setIsFinished(true)
    }, [])

    if (!isFinished)
        // eslint-disable-next-line unicorn/no-null
        return null

    return <Child registryEntry={registryEntry} />
}

const withParametersLocalResolve: WithParametersLocalResolve = (Child) => ({
    organizationName,
    projectName,
    projectCycle,
    isOfficial
}) => {

    const registryService = useInjectable(RegistryService)
    const [registryEntry, setRegistryEntry] = useState<RegistryEntry | undefined>()
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {
        setRegistryEntry(registryService.findByParameters(
            organizationName, projectName, projectCycle, isOfficial
        ))
        setIsFinished(true)
    }, [])

    if (!isFinished)
        // eslint-disable-next-line unicorn/no-null
        return null

    return <Child registryEntry={registryEntry} />
}

const withScanLocalResolve: WithScanLocalResolve = (Child) => ({ directory }) => {

    const ParametersLocalResolveWorkflow = withParametersLocalResolve(Child)
    const ScanWorkflow = withScan(({ organization, project }) => (
        <ParametersLocalResolveWorkflow
            organizationName={organization.name}
            projectName={project.name}
        />
    ))

    return <ScanWorkflow directory={directory} />
}

export {
    withLocalResolve
}
