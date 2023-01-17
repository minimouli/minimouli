/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Directory, File, Path } from '@minimouli/fs'
import { JSONFile } from 'lowdb/node'
import { Low } from 'lowdb'
import { registrySchema } from '../schemas/registry.schema.js'
import type { Registry, RegistryEntry } from '../types/registry.type.js'
import type { InjectableFactory } from '@minimouli/console'
import type { Version } from '@minimouli/types'

type ReadRegistryResponse =
    | {
        database: Low<Registry>
        error?: undefined
    }
    | {
        error: string
        database?: undefined
    }

class RegistryService {

    private static RegistryFilePath = Path.app().join('registry.json')

    constructor(
        private readonly database: Low<Registry>
    ) {}

    static setup(): InjectableFactory<RegistryService> {
        return {
            useFactory: async () => {

                const { database, error } = await RegistryService.readRegistry(RegistryService.RegistryFilePath)

                if (error !== undefined)
                    throw new Error(error)

                return new RegistryService(database)
            },
            token: RegistryService
        }
    }

    private static async readRegistry(registryFilePath: Path): Promise<ReadRegistryResponse> {

        const registryFile = new File(registryFilePath)
        const { contents, error: error1 } = await registryFile.getContents()

        if (error1 !== undefined || contents === null)
            return RegistryService.createRegistry(registryFilePath)

        try {

            const registry = JSON.parse(contents.toString()) as Registry
            const { error: error2 } = registrySchema.validate(registry)

            if (error2 !== undefined)
                return { error: 'The registry file format is incorrect (validation)' }

            const adapter = new JSONFile<Registry>(RegistryService.RegistryFilePath.toString())
            const database = new Low(adapter)
            await database.read()

            return { database }

        } catch {
            return { error: 'The registry file format is incorrect (non-json)' }
        }
    }

    private static async createRegistry(registryFilePath: Path): Promise<ReadRegistryResponse> {

        const parentDirectory = new Directory(registryFilePath.join('..'))

        const { error: error1 } = await parentDirectory.mkdir({
            recursive: true
        })

        if (error1 !== undefined)
            return { error: 'The parent directory of the registry file cannot be created' }

        const adapter = new JSONFile<Registry>(RegistryService.RegistryFilePath.toString())
        const database = new Low(adapter)
        database.data = {
            moulinettes: []
        }

        return { database }
    }

    findByIdAndVersion(id: string, version: Version): RegistryEntry | undefined {

        if (this.database.data === null)
            return undefined

        return this.database.data.moulinettes.find((moulinette) => {

            if (moulinette.id !== id)
                return false

            return moulinette.version.every((element, index) => element === version[index])
        })
    }

    findByParameters(
        organizationName: string,
        projectName: string,
        projectCycle?: number,
        isOfficial?: boolean
    ): RegistryEntry | undefined {

        if (this.database.data === null)
            return undefined

        return this.database.data.moulinettes.find((moulinette) => {

            if (moulinette.organization.name !== organizationName)
                return false

            if (moulinette.project.name !== projectName)
                return false

            if (projectCycle !== undefined && moulinette.project.cycle !== projectCycle)
                return false

            if (isOfficial !== undefined && moulinette.isOfficial !== isOfficial)
                return false

            return true
        })
    }

    insert(entry: RegistryEntry): void {

        if (this.database.data === null)
            return

        this.database.data.moulinettes.push(entry)
    }

    save(): Promise<void> {
        return this.database.write()
    }
}

export {
    RegistryService
}
