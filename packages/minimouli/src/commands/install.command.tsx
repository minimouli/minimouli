/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BooleanArgument, Command, EnumArgument, IntegerArgument, PathArgument, StringArgument } from '@minimouli/console'
import { Path } from '@minimouli/fs'
import React from 'react'
import { AppProvider } from '../components/providers/AppProvider.js'
import { InstallWorkflow } from '../components/workflows/InstallWorkflow.js'
import { ResolveWorkflow } from '../components/workflows/ResolveWorkflow.js'
import { ScanWorkflow } from '../components/workflows/ScanWorkflow.js'
import { ResolveSource } from '../enums/resolve-source.enum.js'
import { getCurrentCycle } from '../helpers/cycle.helper.js'
import type { MoulinetteEntity, MoulinetteSourceEntity } from '@minimouli/sdk'
import type { ReactElement } from 'react'

class InstallCommand extends Command {

    public readonly name = 'install'

    public readonly description = [
        'Resolve, download and install a moulinette.',
        'By default the moulinette resolution is based on the scan of the current directory.',
        'You can provide manual information to install a specific moulinette.',
        'This command will not re-install a currently installed moulinette.'
    ]
    public readonly shortDescription = 'Install a new moulinette'

    private directory = this.arg(
        new PathArgument('directory')
            .setDescription(`The directory to scan. Used when source is set to '${ResolveSource.Scan}'`)
            .setDefault(Path.current())
            .optional()
    )

    private moulinette = this.arg(
        new StringArgument('moulinette')
            .setDescription(`Id of the desired moulinette. Used when source is set to '${ResolveSource.Manual}'`)
            .setDefault('')
            .optional()
    )

    private organizationName = this.arg(
        new StringArgument('organizationName')
            .setDescription(`Organization name of the desired moulinette. Used when source is set to '${ResolveSource.Parameters}'`)
            .setDefault('')
            .optional()
    )

    private projectName = this.arg(
        new StringArgument('projectName')
            .setDescription(`Project name of the desired moulinette. Used when source is set to '${ResolveSource.Parameters}'`)
            .setDefault('')
            .optional()
    )

    private projectCycle = this.arg(
        new IntegerArgument('projectCycle')
            .setDescription(`Project cycle of the desired moulinette. Used when source is set to '${ResolveSource.Parameters}'`)
            .setDefault(getCurrentCycle())
            .optional()
    )

    private isOfficial = this.arg(
        new BooleanArgument('isOfficial')
            .setDescription(`Official status of the desired moulinette. Used when source is set to '${ResolveSource.Parameters}'`)
            .setDefault(true)
            .optional()
    )

    private source = this.opt(
        new EnumArgument('source')
            .setDescription('Install source')
            .setValues([
                ResolveSource.Manual,
                ResolveSource.Parameters,
                ResolveSource.Scan
            ])
            .setDefault(ResolveSource.Scan)
    )

    execute(): ReactElement {

        switch (this.source.content) {
            case ResolveSource.Manual:
                return this.installFromManualInformation()
            case ResolveSource.Parameters:
                return this.installFromParameters()
            default:
                return this.installFromScanning()
        }
    }

    private installFromManualInformation(): ReactElement {
        return (
            <AppProvider command={this.name} >
                <ResolveWorkflow
                    source={ResolveSource.Manual}
                    moulinetteId={this.moulinette.content}
                >
                    {(moulinette: MoulinetteEntity, moulinetteSource: MoulinetteSourceEntity) => (
                        <InstallWorkflow
                            moulinette={moulinette}
                            moulinetteSource={moulinetteSource}
                        />
                    )}
                </ResolveWorkflow>
            </AppProvider>
        )
    }

    private installFromParameters(): ReactElement {
        return (
            <AppProvider command={this.name} >
                <ResolveWorkflow
                    source={ResolveSource.Parameters}
                    organizationName={this.organizationName.content}
                    projectName={this.projectName.content}
                    projectCycle={this.projectCycle.content}
                    isOfficial={this.isOfficial.content}
                >
                    {(moulinette: MoulinetteEntity, moulinetteSource: MoulinetteSourceEntity) => (
                        <InstallWorkflow
                            moulinette={moulinette}
                            moulinetteSource={moulinetteSource}
                        />
                    )}
                </ResolveWorkflow>
            </AppProvider>
        )
    }

    private installFromScanning(): ReactElement {
        return (
            <AppProvider command={this.name} >
                <ScanWorkflow directory={this.directory.content} >
                    {(scanResult) => (
                        <ResolveWorkflow
                            source={ResolveSource.Scan}
                            organizationName={scanResult.organization.name}
                            projectName={scanResult.project.name}
                            projectCycle={this.projectCycle.content}
                            isOfficial={this.isOfficial.content}
                        >
                            {(moulinette: MoulinetteEntity, moulinetteSource: MoulinetteSourceEntity) => (
                                <InstallWorkflow
                                    moulinette={moulinette}
                                    moulinetteSource={moulinetteSource}
                                />
                            )}
                        </ResolveWorkflow>
                    )}
                </ScanWorkflow>
            </AppProvider>
        )
    }

}

export {
    InstallCommand
}
