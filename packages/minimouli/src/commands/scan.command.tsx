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
import { ErrorBoundary } from '../components/ErrorBoundary.js'
import { JsonPrinter } from '../components/printers/JsonPrinter.js'
import { ObjectPrinter } from '../components/printers/ObjectPrinter.js'
import { ScanWorkflow } from '../components/workflows/ScanWorkflow.js'
import { DisplayFormat } from '../enums/display-format.enum.js'
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

    private format = this.arg(
        new EnumArgument('format')
            .setDescription('The display format of the result')
            .setDefault(DisplayFormat.Object)
            .setValues([
                DisplayFormat.Object,
                DisplayFormat.PrettyJson,
                DisplayFormat.MinifiedJson
            ])
            .optional()
    )

    execute(): ReactElement {

        switch (this.format.content) {
            case DisplayFormat.PrettyJson:
                return this.displayPrettyJsonFormat()

            case DisplayFormat.MinifiedJson:
                return this.displayMinifiedJsonFormat()

            default:
                return this.displayObjectFormat()
        }
    }

    private displayObjectFormat(): ReactElement {
        return (
            <AppProvider command={this.name} >
                <ScanWorkflow directory={this.directory.content} >
                    {(result) => <ObjectPrinter object={result} />}
                </ScanWorkflow>
            </AppProvider>
        )
    }

    private displayPrettyJsonFormat(): ReactElement {
        return (
            <ErrorBoundary>
                <ScanWorkflow directory={this.directory.content} >
                    {(result) => <JsonPrinter content={result} />}
                </ScanWorkflow>
            </ErrorBoundary>
        )
    }

    private displayMinifiedJsonFormat(): ReactElement {
        return (
            <ErrorBoundary>
                <ScanWorkflow directory={this.directory.content} >
                    {(result) => <JsonPrinter content={result} minified />}
                </ScanWorkflow>
            </ErrorBoundary>
        )
    }

}

export {
    ScanCommand
}
