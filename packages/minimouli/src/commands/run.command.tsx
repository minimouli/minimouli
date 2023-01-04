/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Command, EnumArgument, PathArgument, VersionedPackageArgument } from '@minimouli/console'
import { Path } from '@minimouli/fs'
import { Box } from 'ink'
import React from 'react'
import { Upload } from '../components/Upload.js'
import { AppProvider } from '../components/providers/AppProvider.js'
import { SuitesViewer } from '../components/viewers/SuitesViewer.js'
import { MoulinetteOrigin } from '../enums/moulinette-origin.enum.js'
import { ResolveSource } from '../enums/resolve-source.enum.js'
import { withInstall } from '../workflows/install.workflow.js'
import { withResolve } from '../workflows/resolve.workflow.js'
import { withRun } from '../workflows/run.workflow.js'
import type { ReactElement } from 'react'

class RunCommand extends Command {

    public readonly name = 'run'

    public readonly description = [
        'Run a moulinette in a project directory.',
        'This command will resolve, download and install a moulinette if necessary.',
        'By default the moulinette resolution is based on the scan of the current directory.'
    ]
    public readonly shortDescription = 'Run a moulinette in a project directory'

    private directory = this.arg(
        new PathArgument('directory')
            .setDescription('The directory to run')
            .setDefault(Path.current())
            .optional()
    )

    private moulinette = this.arg(
        new VersionedPackageArgument('moulinette')
            .setDescription(`Id of the desired moulinette. Used when source is set to '${ResolveSource.Manual}'`)
            .optional()
    )

    private source = this.opt(
        new EnumArgument('source')
            .setDescription('Install source')
            .setValues([
                ResolveSource.Manual,
                ResolveSource.Scan
            ])
            .setDefault(ResolveSource.Scan)
    )

    execute(): ReactElement {

        const RunWorkflow = withRun(({ suites, moulinette }) => (
            <Box flexDirection="column" >
                <SuitesViewer suites={suites} />
                <Box marginTop={1} >
                    <Upload suites={suites} moulinette={moulinette} />
                </Box>
            </Box>
        ))

        const InstallWorkflow = withInstall(({ moulinette, moulinetteSource, moulinettePath }) => (
            <RunWorkflow
                projectPath={this.directory.content}
                moulinette={`${moulinette.id}@${moulinetteSource.version.join('.')}`}
                moulinettePath={moulinettePath}
            />
        ))

        const ResolveWorkflow = withResolve((props) => {

            if (props.origin === MoulinetteOrigin.Local)
                return (
                    <RunWorkflow
                        projectPath={this.directory.content}
                        moulinette={`${props.registryEntry.id}@${props.registryEntry.version.join('.')}`}
                        moulinettePath={Path.fromAbsolute(props.registryEntry.path)}
                    />
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
    RunCommand
}
