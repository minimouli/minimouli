/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { withScan } from './scan.workflow.js'
import { withLocalResolve } from './local-resolve.workflow.js'
import { withRemoteResolve } from './remote-resolve.workflow.js'
import { MoulinetteOrigin } from '../enums/moulinette-origin.enum.js'
import { ResolveSource } from '../enums/resolve-source.enum.js'
import type { Path } from '@minimouli/fs'
import type { MoulinetteEntity, MoulinetteSourceEntity } from '@minimouli/sdk'
import type { Version } from '@minimouli/types'
import type { RegistryEntry } from '../types/registry.type.js'
import type { With } from '../types/with.type.js'

interface ManualResolveWorkflowProps {
    moulinetteId: string
    moulinetteVersion: Version
}

interface ParametersResolveWorkflowProps {
    organizationName: string
    projectName: string
    projectCycle?: number
    isOfficial?: boolean
}

interface ScanResolveWorkflowProps {
    directory: Path
}

type ResolveWorkflowProps =
    | ManualResolveWorkflowProps & { source: ResolveSource.Manual }
    | ParametersResolveWorkflowProps & { source: ResolveSource.Parameters }
    | ScanResolveWorkflowProps & { source: ResolveSource.Scan }

type ResolveChildProps =
    | {
        origin: MoulinetteOrigin.Local
        registryEntry: RegistryEntry
    }
    | {
        origin: MoulinetteOrigin.Remote
        moulinette: MoulinetteEntity
        moulinetteSource: MoulinetteSourceEntity
    }

type WithResolve = With<ResolveWorkflowProps, ResolveChildProps>
type WithManualResolve = With<ManualResolveWorkflowProps, ResolveChildProps>
type WithParametersResolve = With<ParametersResolveWorkflowProps, ResolveChildProps>
type WithScanResolve = With<ScanResolveWorkflowProps, ResolveChildProps>

const withResolve: WithResolve = (Child) => (props) => {

    const ManualResolveWorkflow = withManualResolve(Child)
    const ParametersResolveWorkflow = withParametersResolve(Child)
    const ScanResolveWorkflow = withScanResolve(Child)

    switch (props.source) {
        case ResolveSource.Manual:
            return <ManualResolveWorkflow {...props} />

        case ResolveSource.Parameters:
            return <ParametersResolveWorkflow {...props} />

        case ResolveSource.Scan:
            return <ScanResolveWorkflow {...props} />

        default:
            // eslint-disable-next-line unicorn/no-null
            return null
    }
}

const withManualResolve: WithManualResolve = (Child) => (props) => {

    const RemoteResolveWorkflow = withRemoteResolve((childProps) => (
        <Child origin={MoulinetteOrigin.Remote} {...childProps} />
    ))
    const LocalResolveWorkflow = withLocalResolve(({ registryEntry }) => {

        if (registryEntry === undefined)
            return <RemoteResolveWorkflow source={ResolveSource.Manual} {...props} />

        return <Child origin={MoulinetteOrigin.Local} registryEntry={registryEntry} />
    })

    return <LocalResolveWorkflow source={ResolveSource.Manual} {...props} />
}

const withParametersResolve: WithParametersResolve = (Child) => (props) => {

    const RemoteResolveWorkflow = withRemoteResolve((childProps) => (
        <Child origin={MoulinetteOrigin.Remote} {...childProps} />
    ))
    const LocalResolveWorkflow = withLocalResolve(({ registryEntry }) => {

        if (registryEntry === undefined)
            return <RemoteResolveWorkflow source={ResolveSource.Parameters} {...props} />

        return <Child origin={MoulinetteOrigin.Local} registryEntry={registryEntry} />
    })

    return <LocalResolveWorkflow source={ResolveSource.Parameters} {...props} />
}

const withScanResolve: WithScanResolve = (Child) => ({ directory }) => {

    const ParametersResolveWorkflow = withParametersResolve(Child)
    const ScanWorkflow = withScan(({ organization, project }) => (
        <ParametersResolveWorkflow
            organizationName={organization.name}
            projectName={project.name}
        />
    ))

    return <ScanWorkflow directory={directory} />
}

export {
    withResolve
}
