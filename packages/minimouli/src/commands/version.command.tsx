/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Command, EnumArgument, Inject } from '@minimouli/console'
import { Text } from 'ink'
import React from 'react'
import { JsonPrinter } from '../components/printers/JsonPrinter.js'
import { DisplayFormat } from '../enums/display-format.enum.js'
import { toString } from '../helpers/version.helper.js'
import { ConfigService } from '../services/config.service.js'
import type { ReactElement } from 'react'

class VersionCommand extends Command {

    public readonly name = 'version'

    public readonly description = ['Display the current version of the CLI.']
    public readonly shortDescription = 'Display the current version of the CLI'

    private format = this.arg(
        new EnumArgument('format')
            .setDescription('The display format of the version')
            .setDefault(DisplayFormat.Text)
            .setValues([
                DisplayFormat.Text,
                DisplayFormat.PrettyJson,
                DisplayFormat.MinifiedJson
            ])
            .optional()
    )

    constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService
    ) {
        super()
    }

    execute(): ReactElement {

        switch (this.format.content) {
            case DisplayFormat.PrettyJson:
                return this.displayPrettyJsonFormat()

            case DisplayFormat.MinifiedJson:
                return this.displayMinifiedJsonFormat()

            default:
                return this.displayTextFormat()
        }
    }

    private displayTextFormat(): ReactElement {

        const cli = this.configService.config.app.cli
        const version = toString(this.configService.config.app.version)

        return (
            <Text>{cli} {version}</Text>
        )
    }

    private displayPrettyJsonFormat(): ReactElement {

        const [major, minor, patch] = this.configService.config.app.version
        const content = {
            major,
            minor,
            patch
        }

        return (
            <JsonPrinter content={content} />
        )
    }

    private displayMinifiedJsonFormat(): ReactElement {

        const [major, minor, patch] = this.configService.config.app.version
        const content = {
            major,
            minor,
            patch
        }

        return (
            <JsonPrinter content={content} minified />
        )
    }

    override get aliases(): string[] {
        return [
            '-v',
            '--version'
        ]
    }

}

export {
    VersionCommand
}
