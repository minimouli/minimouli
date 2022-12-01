/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Application } from '@minimouli/console'
import { Path } from '@minimouli/fs'
import { LoginCommand } from './commands/login.command.js'
import { ScanCommand } from './commands/scan.command.js'
import { VersionCommand } from './commands/version.command.js'
import { AuthConfigService } from './services/auth-config.service.js'
import { ConfigService } from './services/config.service.js'
import { ScanService } from './services/scan.service.js'

const run = async (args: string[]): Promise<void> => {

    const app = new Application()

    const currentPath = Path.fromAbsolute(dirname(fileURLToPath(import.meta.url)))
    const configPath = currentPath.join('../config.json')

    await app.addInjectables([
        AuthConfigService.setup(),
        ConfigService.setup(configPath),
        ScanService
    ])

    app.addCommands([
        LoginCommand,
        ScanCommand,
        VersionCommand
    ])

    app.exec(args)
}

export {
    run
}
