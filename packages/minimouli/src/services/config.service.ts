/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { File, Path } from '@minimouli/fs'
import deepmerge from 'deepmerge'
import { configSchema } from '../schemas/config.schema.js'
import { preferencesSchema } from '../schemas/preferences.schema.js'
import type { InjectableFactory } from '@minimouli/console'
import type { ApplicationConfig } from '../types/application.config.type.js'

type ReadConfigResponse =
    | {
        config: ApplicationConfig
        error?: undefined
    }
    | {
        error: string
        config?: undefined
    }

type ReadPreferencesResponse =
    | {
        config: Partial<ApplicationConfig>
        error?: undefined
    }
    | {
        error: string
        config?: undefined
    }

class ConfigService {

    private static PreferencesFilePath = Path.app().join('preferences.json')

    constructor(
        public readonly config: ApplicationConfig
    ) {}

    static setup(configFilePath: Path): InjectableFactory<ConfigService> {
        return {
            useFactory: async () => {

                const { config, error } = await ConfigService.readConfig(
                    configFilePath,
                    ConfigService.PreferencesFilePath
                )

                if (error !== undefined)
                    throw new Error(error)

                return new ConfigService(config)
            },
            token: ConfigService
        }
    }

    private static async readConfig(configFilePath: Path, preferencesFilePath: Path): Promise<ReadConfigResponse> {

        const { config: baseConfig, error: error1 } = await this.readBaseConfig(configFilePath)
        if (error1 !== undefined)
            return { error: error1 }

        const { config: preferencesConfig, error: error2 } = await this.readPreferences(preferencesFilePath)
        if (error2 !== undefined)
            return { error: error2 }

        const config = deepmerge(baseConfig, preferencesConfig)

        return { config }
    }

    private static async readBaseConfig(configFilePath: Path): Promise<ReadConfigResponse> {

        const configFile = new File(configFilePath)
        const { contents, error: error1 } = await configFile.getContents()

        if (error1 !== undefined || contents === null)
            return { error: 'The configuration file cannot be read' }

        try {

            const config = JSON.parse(contents.toString()) as ApplicationConfig
            const { error: error2 } = configSchema.validate(config)

            if (error2 !== undefined)
                return { error: 'The configuration file is not in an accepted format (validation)' }

            return { config }

        } catch {
            return { error: 'The configuration file is not in an accepted format (non-json)' }
        }
    }

    private static async readPreferences(preferencesFilePath: Path): Promise<ReadPreferencesResponse> {

        const preferencesFile = new File(preferencesFilePath)
        const { contents, error: error1 } = await preferencesFile.getContents()

        if (error1 !== undefined || contents === null)
            return { config: {} }

        try {

            const config = JSON.parse(contents.toString()) as Partial<ApplicationConfig>
            const { error: error2 } = preferencesSchema.validate(config)

            if (error2 !== undefined)
                return { error: 'The preferences file is not in an accepted format (validation)' }

            return { config }

        } catch {
            return { error: 'The preferences file is not in an accepted format (non-json)' }
        }
    }

}

export {
    ConfigService
}
