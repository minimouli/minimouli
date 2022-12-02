/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Command, CommandManager, Inject, StringArgument } from '@minimouli/console'
import { Box, Text } from 'ink'
import React from 'react'
import { ErrorOverview } from '../components/ErrorOverview.js'
import { Section } from '../components/Section.js'
import { Snippet } from '../components/Snippet.js'
import { AppProvider } from '../components/providers/AppProvider.js'
import { ArgumentViewer } from '../components/viewers/ArgumentViewer.js'
import { CommandViewer } from '../components/viewers/CommandViewer.js'
import { ConfigService } from '../services/config.service.js'
import type { ReactElement } from 'react'

class HelpCommand extends Command {

    public readonly name = 'help'

    public readonly description = ['Display available commands list or display more information about a single command.']
    public readonly shortDescription = 'Display available commands or more information about a command'

    private commandName = this.arg(
        new StringArgument('commandName')
            .setDescription('The name or one of the aliases of a command to get more information about it')
            .optional()
    )

    constructor(
        @Inject(CommandManager)
        private readonly commandManager: CommandManager,
        @Inject(ConfigService)
        private readonly configService: ConfigService
    ) {
        super()
    }

    execute(): ReactElement {

        const commandName = this.commandName.content

        if (commandName === '')
            return this.displayCommandList()

        const command = this.commandManager.findByNameOrAlias(commandName)

        if (command === undefined)
            return this.displayUnknownCommand(commandName)

        return this.displayCommandInformation(command)
    }

    private displayCommandList(): ReactElement {

        const config = this.configService.config

        return (
            <AppProvider command={this.name} >
                <Section title="Usage" >
                    <Box marginLeft={2} marginBottom={1} >
                        <Snippet command={`${config.app.cli} <subcommand>`} />
                    </Box>
                </Section>

                <Section title="Commands" >
                    {this.commandManager.commands.map((command, index) => (
                        <CommandViewer key={index} command={command} />
                    ))}
                </Section>

                <Box flexDirection="column" >
                    <Text>You can print more information about a command by running:</Text>
                    <Snippet command={`${config.app.cli} ${this.name} <command>`} />
                </Box>
            </AppProvider>
        )
    }

    private displayCommandInformation(command: Command): ReactElement {
        return (
            <AppProvider command={this.name} >
                <Section title="Usage" >
                    <Box marginLeft={2} marginBottom={1} >
                        <Snippet command={`${this.configService.config.app.cli} ${command.name}`} />
                    </Box>
                </Section>

                <Section title="Description" >
                    <Box flexDirection="column" marginLeft={2} marginBottom={1} >
                        {command.description.map((line, index) => (
                            <Text key={index} >{line}</Text>
                        ))}
                    </Box>
                </Section>

                {command.aliases.length > 0 && (
                    <Section title="Aliases" >
                        <Box flexDirection="column" marginLeft={2} marginBottom={1} >
                            {command.aliases.map((alias, index) => (
                                <Text key={index} >- {alias}</Text>
                            ))}
                        </Box>
                    </Section>
                )}

                {command.arguments.length > 0 && (
                    <Section title="Arguments" >
                        <Box flexDirection="column" marginLeft={2} >
                            {command.arguments.map((argument, index) => (
                                <ArgumentViewer key={index} argument={argument} />
                            ))}
                        </Box>
                    </Section>
                )}

                {command.options.length > 0 && (
                    <Section title="Options" >
                        <Box flexDirection="column" marginLeft={2} >
                            {command.options.map((argument, index) => (
                                <ArgumentViewer key={index} argument={argument} option />
                            ))}
                        </Box>
                    </Section>
                )}
            </AppProvider>
        )
    }

    private displayUnknownCommand(commandName: string): ReactElement {
        return (
            <AppProvider command={this.name} >
                <ErrorOverview error={`The subcommand '${commandName}' wasn't recognized`} />
            </AppProvider>
        )
    }

    override get aliases(): string[] {
        return [
            '-h',
            '--help'
        ]
    }

}

export {
    HelpCommand
}
