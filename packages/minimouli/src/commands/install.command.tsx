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
    StringArgument,
    VersionedPackageArgument
} from '@minimouli/console'
import { Path } from '@minimouli/fs'
import { Box, Text } from 'ink'
import React from 'react'
import { AppProvider } from '../components/providers/AppProvider.js'
import { MoulinetteOrigin } from '../enums/moulinette-origin.enum.js'
import { ResolveSource } from '../enums/resolve-source.enum.js'
import { getCurrentCycle } from '../helpers/cycle.helper.js'
import { withInstall } from '../workflows/install.workflow.js'
import { withResolve } from '../workflows/resolve.workflow.js'
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
        new VersionedPackageArgument('moulinette')
            .setDescription(`Id of the desired moulinette. Used when source is set to '${ResolveSource.Manual}'`)
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

        const InstallWorkflow = withInstall(({ moulinette, moulinetteSource }) => (
            <Box>
                <Text>Successfully installed the {moulinette.project.name} moulinette</Text>
                <Text> </Text>
                <Text dimColor >({moulinette.id}@{moulinetteSource.version.join('.')})</Text>
            </Box>
        ))

        const ResolveWorkflow = withResolve((props) => {

            if (props.origin === MoulinetteOrigin.Local)
                return (
                    <Box>
                        <Text>The {props.registryEntry.project.name} moulinette is already installed</Text>
                        <Text> </Text>
                        <Text dimColor >({props.registryEntry.id}@{props.registryEntry.version.join('.')})</Text>
                    </Box>
                )

            /* The origin is MoulinetteOrigin.Remote */
            return (
                <InstallWorkflow
                    moulinette={props.moulinette}
                    moulinetteSource={props.moulinetteSource}
                />
            )
        })

        return (
            <AppProvider command={this.name} >
                {this.source.content === ResolveSource.Manual && (
                    <ResolveWorkflow
                        source={ResolveSource.Manual}
                        moulinetteId={this.moulinette.content.name}
                        moulinetteVersion={this.moulinette.content.version}
                    />
                )}

                {this.source.content === ResolveSource.Parameters && (
                    <ResolveWorkflow
                        source={ResolveSource.Parameters}
                        organizationName={this.organizationName.content}
                        projectName={this.projectName.content}
                        projectCycle={this.projectCycle.content}
                        isOfficial={this.isOfficial.content}
                    />
                )}

                {this.source.content === ResolveSource.Scan && (
                    <ResolveWorkflow
                        source={ResolveSource.Scan}
                        directory={this.directory.content}
                    />
                )}
            </AppProvider>
        )
    }

}

export {
    InstallCommand
}
