/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'ink'
import { CommandManager } from './command/CommandManager.js'
import type { Command } from './command/Command.js'

class Application {

    public readonly commandManager = new CommandManager()

    addCommand(command: Command): void {
        this.commandManager.register(command)
    }

    exec(args: string[]): void {

        const command = this.commandManager.findCommand(args)

        if (command === undefined)
            return

        render(command.execute())
    }

}

export {
    Application
}
