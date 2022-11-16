/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fillArguments, fillOptions } from '../helpers/fill.helper.js'
import { findCommandAndArguments } from '../helpers/find.helper.js'
import { matchArguments, matchOptions } from '../helpers/match.helper.js'
import { ArgumentParser } from '../parser/argument-parser.js'
import type { Command } from './command.js'
import type { InjectableManager } from '../injectable/injectable-manager.js'
import type { Class } from '../types/class.type.js'

class CommandManager {

    public readonly commands: Command[] = []

    constructor(
        private injectableManager: InjectableManager
    ) {}

    register(command: Class<Command>): void {
        this.commands.push(this.injectableManager.instantiate(command))
    }

    findCommand(args: string[]): Command | undefined {

        const commandAndArguments = findCommandAndArguments(args, this)

        if (commandAndArguments === undefined)
            return undefined

        const [command, commandArguments] = commandAndArguments

        const parser = new ArgumentParser().parse(commandArguments)
        const argumentMatches = matchArguments(command.arguments, parser.argumentTokenList)
        const optionMatches = matchOptions(command.options, parser.optionTokenList)

        if (argumentMatches === undefined || optionMatches === undefined)
            return undefined

        fillArguments(argumentMatches)
        fillOptions(optionMatches)

        return command
    }

    findByName(name: string): Command | undefined {
        return this.commands.find((command) => command.name === name)
    }

    findByAlias(alias: string): Command | undefined {
        return this.commands.find((command) => command.aliases.includes(alias))
    }

    findByNameOrAlias(nameOrAlias: string): Command | undefined {

        const commandByName = this.findByName(nameOrAlias)

        if (commandByName !== undefined)
            return commandByName

        return this.findByAlias(nameOrAlias)
    }

}

export {
    CommandManager
}
