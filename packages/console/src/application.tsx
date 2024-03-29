/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'ink'
import React from 'react'
import { CommandManager } from './command/command-manager.js'
import { InjectableContext } from './contexts/injectable.context.js'
import { InjectableManager } from './injectable/injectable-manager.js'
import type { Command } from './command/command.js'
import type { Class } from './types/class.type.js'
import type { Injectable } from './types/injectable.type.js'

class Application {

    public readonly injectableManager = new InjectableManager()
    public readonly commandManager = new CommandManager(this.injectableManager)

    constructor() {
        this.injectableManager.set(CommandManager, this.commandManager)
    }

    async addInjectable(injectable: Injectable): Promise<void> {
        await this.injectableManager.register(injectable)
    }

    async addInjectables(injectables: Injectable[]): Promise<void> {
        for (const injectable of injectables)
            // eslint-disable-next-line no-await-in-loop
            await this.addInjectable(injectable)
    }

    addCommand(command: Class<Command>): void {
        this.commandManager.register(command)
    }

    addCommands(commands: Class<Command>[]): void {
        for (const command of commands)
            this.addCommand(command)
    }

    exec(args: string[]): void {

        const command = this.commandManager.findCommand(args)

        if (command === undefined)
            return

        render(
            <InjectableContext.Provider value={this.injectableManager} >
                {command.execute()}
            </InjectableContext.Provider>
        )
    }

}

export {
    Application
}
