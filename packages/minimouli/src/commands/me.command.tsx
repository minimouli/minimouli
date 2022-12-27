/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Command, EnumArgument } from '@minimouli/console'
import React from 'react'
import { ErrorOverview } from '../components/ErrorOverview.js'
import { JsonPrinter } from '../components/printers/JsonPrinter.js'
import { ObjectPrinter } from '../components/printers/ObjectPrinter.js'
import { AppProvider } from '../components/providers/AppProvider.js'
import { DisplayFormat } from '../enums/display-format.enum.js'
import { withMe } from '../workflows/me.workflow.js'
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

        const MeWorkflow = withMe(({ user }) => {

            if (user === undefined) {

                if (this.format.content === DisplayFormat.PrettyJson)
                    return <JsonPrinter content={{ error: 'You are not logged in' }} />

                if (this.format.content === DisplayFormat.MinifiedJson)
                    return <JsonPrinter content={{ error: 'You are not logged in' }} minified />

                return <ErrorOverview error="You are not logged in" />
            }

            if (this.format.content === DisplayFormat.PrettyJson)
                return <JsonPrinter content={user} />

            if (this.format.content === DisplayFormat.MinifiedJson)
                return <JsonPrinter content={user} minified />

            if (this.format.content === DisplayFormat.Object)
                return <ObjectPrinter object={user} />

            // eslint-disable-next-line unicorn/no-null
            return null
        })
        const headless = this.format.content !== DisplayFormat.Object

        return (
            <AppProvider command={this.name} headless={headless} >
                <MeWorkflow silent={headless} />
            </AppProvider>
        )
    }

}

export {
    MeCommand
}
