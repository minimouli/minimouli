/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    BooleanArgument,
    Command,
    EnumArgument,
    IntegerArgument,
    PathArgument,
    StringArgument
} from '@minimouli/console'
import { Path } from '@minimouli/fs'
import React from 'react'
import { AppProvider } from '../components/providers/AppProvider.js'
import { InstallWorkflow } from '../components/workflows/InstallWorkflow.js'
import { ScanWorkflow } from '../components/workflows/ScanWorkflow.js'
import { InstallSource } from '../enums/install-source.enum.js'
import { getCurrentCycle } from '../helpers/cycle.helper.js'
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
            .setDescription('The directory to scan')
            .setDefault(Path.current())
            .optional()
    )

    private organizationName = this.arg(
        new StringArgument('organizationName')
            .setDescription('Name of the organization')
            .setDefault('')
            .optional()
    )

    private projectName = this.arg(
        new StringArgument('projectName')
            .setDescription('Name of the project')
            .setDefault('')
            .optional()
    )

    private projectCycle = this.arg(
        new IntegerArgument('projectCycle')
            .setDescription('Cycle of the project')
            .setDefault(getCurrentCycle())
            .optional()
    )

    private isOfficial = this.arg(
        new BooleanArgument('isOfficial')
            .setDescription('Is the moulinette officially supported ?')
            .setDefault(true)
            .optional()
    )

    private source = this.opt(
        new EnumArgument('source')
            .setDescription('Install source')
            .setValues([
                InstallSource.Manual,
                InstallSource.Scan
            ])
            .setDefault(InstallSource.Scan)
    )

    execute(): ReactElement {

        switch (this.source.content) {
            case InstallSource.Manual:
                return this.displayFromManualParameters()

            default:
                return this.displayFromScanning()
        }
    }

    private displayFromScanning(): ReactElement {
        return (
            <AppProvider command={this.name} >
                <ScanWorkflow directory={this.directory.content} >
                    {(scanResult) => (
                        <InstallWorkflow
                            organizationName={scanResult.organization.name}
                            projectName={scanResult.project.name}
                            projectCycle={this.projectCycle.content}
                            isOfficial={this.isOfficial.content}
                        />
                    )}
                </ScanWorkflow>
            </AppProvider>
        )
    }

    private displayFromManualParameters(): ReactElement {
        return (
            <AppProvider command={this.name} >
                <InstallWorkflow
                    organizationName={this.organizationName.content}
                    projectName={this.projectName.content}
                    projectCycle={this.projectCycle.content}
                    isOfficial={this.isOfficial.content}
                />
            </AppProvider>
        )
    }

}

export {
    InstallCommand
}
