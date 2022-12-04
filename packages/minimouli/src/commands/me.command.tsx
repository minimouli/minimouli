/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Command, EnumArgument } from '@minimouli/console'
import React from 'react'
import { ErrorBoundary } from '../components/ErrorBoundary.js'
import { ErrorOverview } from '../components/ErrorOverview.js'
import { Loader } from '../components/Loader.js'
import { JsonPrinter } from '../components/printers/JsonPrinter.js'
import { ObjectPrinter } from '../components/printers/ObjectPrinter.js'
import { AppProvider } from '../components/providers/AppProvider.js'
import { CustomAuthProvider } from '../components/providers/CustomAuthProvider.js'
import { MeWorkflow } from '../components/workflows/MeWorkflow.js'
import { DisplayFormat } from '../enums/display-format.enum.js'
import type { ReactElement } from 'react'

class MeCommand extends Command {

    public readonly name = 'me'

    public readonly description = [
        'Display information about your user profile.',
        'The result of this command can be displayed in different formats.'
    ]
    public readonly shortDescription = 'Display information about your user profile'

    private format = this.opt(
        new EnumArgument('format')
            .setDescription('The display format of the user profile')
            .setDefault(DisplayFormat.Object)
            .setValues([
                DisplayFormat.Object,
                DisplayFormat.PrettyJson,
                DisplayFormat.MinifiedJson
            ])
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
                <MeWorkflow
                    loadingFallback={() => <Loader message="Loading" />}
                    notLoggedFallback={() => <ErrorOverview error="You are not logged in" />}
                >
                    {(user) => <ObjectPrinter object={user} />}
                </MeWorkflow>
            </AppProvider>
        )
    }

    private displayPrettyJsonFormat(): ReactElement {
        return (
            <ErrorBoundary>
                <CustomAuthProvider>
                    <MeWorkflow
                        notLoggedFallback={() => <JsonPrinter content={{ error: 'You are not logged in' }} />}
                    >
                        {(user) => <JsonPrinter content={user} />}
                    </MeWorkflow>
                </CustomAuthProvider>
            </ErrorBoundary>
        )
    }

    private displayMinifiedJsonFormat(): ReactElement {
        return (
            <ErrorBoundary>
                <CustomAuthProvider>
                    <MeWorkflow
                        notLoggedFallback={() => <JsonPrinter content={{ error: 'You are not logged in' }} minified />}
                    >
                        {(user) => <JsonPrinter content={user} minified />}
                    </MeWorkflow>
                </CustomAuthProvider>
            </ErrorBoundary>
        )
    }
}

export {
    MeCommand
}
