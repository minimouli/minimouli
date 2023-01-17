/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Command, EnumArgument, PathArgument } from '@minimouli/console'
import { Path } from '@minimouli/fs'
import React from 'react'
import { AppProvider } from '../components/providers/AppProvider.js'
import { JsonPrinter } from '../components/printers/JsonPrinter.js'
import { ObjectPrinter } from '../components/printers/ObjectPrinter.js'
import { DisplayFormat } from '../enums/display-format.enum.js'
import { withScan } from '../workflows/scan.workflow.js'
import type { ReactElement } from 'react'

class ScanCommand extends Command {

    public readonly name = 'scan'

    public readonly description = [
        'Scan the project directory. These retrieved data are partially used in order to determine which moulinette corresponds to a project directory.',
        'The result of this command can be displayed in different formats.'
    ]
    public readonly shortDescription = 'Scan the project directory'

    private directory = this.arg(
        new PathArgument('directory')
            .setDescription('The directory to scan')
            .setDefault(Path.current())
            .optional()
    )

    private format = this.opt(
        new EnumArgument('format')
            .setDescription('The display format of the result')
            .setDefault(DisplayFormat.Object)
            .setValues([
                DisplayFormat.Object,
                DisplayFormat.PrettyJson,
                DisplayFormat.MinifiedJson
            ])
    )

    execute(): ReactElement {

        const ScanWorkflow = withScan((result) => {

            if (this.format.content === DisplayFormat.PrettyJson)
                return <JsonPrinter content={result} />

            if (this.format.content === DisplayFormat.MinifiedJson)
                return <JsonPrinter content={result} minified />

            if (this.format.content === DisplayFormat.Object)
                return <ObjectPrinter object={result} />

            // eslint-disable-next-line unicorn/no-null
            return null
        })
        const headless = this.format.content !== DisplayFormat.Object

        return (
            <AppProvider command={this.name} headless={headless} >
                <ScanWorkflow directory={this.directory.content} />
            </AppProvider>
        )
    }

}

export {
    ScanCommand
}
