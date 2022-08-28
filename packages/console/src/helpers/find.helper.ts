/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Command } from '../command/Command.js'
import type { CommandManager } from '../command/CommandManager.js'

type CommandAndArguments = [Command, string[]]

const findCommandByName = (args: string[], commandManager: CommandManager): CommandAndArguments | undefined => {

    if (args.length === 0)
        return undefined

    const [argv0, ...commandArguments] = args
    const command = commandManager.findByName(argv0)

    if (!command)
        return undefined

    return [command, commandArguments]
}

const findCommandByAlias = (args: string[], commandManager: CommandManager): CommandAndArguments | undefined => {

    if (args.length === 0)
        return undefined

    const [argv0, ...commandArguments] = args
    const command = commandManager.findByAlias(argv0)

    if (!command)
        return undefined

    return [command, commandArguments]
}

const findCommandAndArguments = (args: string[], commandManager: CommandManager): CommandAndArguments | undefined => {

    const command1 = findCommandByName(args, commandManager)
    if (command1 !== undefined)
        return command1

    const command2 = findCommandByAlias(args, commandManager)
    if (command2 !== undefined)
        return command2

    return undefined
}

export {
    findCommandAndArguments
}
