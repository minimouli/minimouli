/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Directory, File, Path } from '@minimouli/fs'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { authConfigSchema } from '../schemas/auth-config.schema.js'
import type { InjectableFactory } from '@minimouli/console'
import type { AuthConfig } from '../types/configs/auth.config.type.js'

type ReadConfigResponse =
    | {
        database: Low<AuthConfig>
        error?: undefined
    }
    | {
        error: string
        database?: undefined
    }

class AuthConfigService {

    private static ConfigFilePath = Path.app().join('auth.json')

    constructor(
        private readonly database: Low<AuthConfig>
    ) {}

    static setup(): InjectableFactory<AuthConfigService> {
        return {
            useFactory: async () => {

                const { database, error } = await AuthConfigService.readConfig(AuthConfigService.ConfigFilePath)

                if (error !== undefined)
                    throw new Error(error)

                return new AuthConfigService(database)
            },
            token: AuthConfigService
        }
    }

    private static async readConfig(configFilePath: Path): Promise<ReadConfigResponse> {

        const configFile = new File(configFilePath)
        const { contents, error: error1 } = await configFile.getContents()

        if (error1 !== undefined || contents === null)
            return AuthConfigService.createConfig(configFilePath)

        try {

            const config = JSON.parse(contents.toString()) as AuthConfig
            const { error: error2 } = authConfigSchema.validate(config)

            if (error2 !== undefined)
                return { error: 'The auth configuration file format is incorrect (validation)' }

            const adapter = new JSONFile<AuthConfig>(AuthConfigService.ConfigFilePath.toString())
            const database = new Low(adapter)
            await database.read()

            return { database }

        } catch {
            return { error: 'The auth configuration file format is incorrect (non-json)' }
        }
    }

    private static async createConfig(configFilePath: Path): Promise<ReadConfigResponse> {

        const parentDirectory = new Directory(configFilePath.join('..'))

        const { error: error1 } = await parentDirectory.mkdir({
            recursive: true
        })

        if (error1 !== undefined)
            return { error: 'The parent directory of the auth configuration file cannot be created' }

        const adapter = new JSONFile<AuthConfig>(AuthConfigService.ConfigFilePath.toString())
        const database = new Low(adapter)
        database.data = {}

        return { database }
    }

    get data(): AuthConfig | null {
        return this.database.data
    }

    set data(data: AuthConfig | null) {
        this.database.data = data
    }

    save(): Promise<void> {
        return this.database.write()
    }

}

export {
    AuthConfigService
}
