/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Inject } from '@minimouli/console'
import axios from 'axios'
import { ConfigService } from './config.service.js'
import { fromString } from '../helpers/version.helper.js'
import type { Version } from '@minimouli/types'

interface NpmRegistryEntry {
    'dist-tags': {
        latest: string
    }
}

class UpgradeCheckService {

    private readonly abortController = new AbortController()

    constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService
    ) {}

    async getLatestVersion(packageName: string): Promise<Version> {
        try {
            const response = await axios.get<NpmRegistryEntry>(`https://registry.npmjs.org/${packageName}`, {
                signal: this.abortController.signal
            })
            const latestVersion = response.data['dist-tags'].latest

            return fromString(latestVersion)
        } catch {
            return [Number.NaN, Number.NaN, Number.NaN]
        }
    }

    getAppLatestVersion(): Promise<Version> {
        const packageName = this.configService.config.package.name
        return this.getLatestVersion(packageName)
    }

    abortAllRequests(): void {
        this.abortController.abort()
    }

}

export {
    UpgradeCheckService
}
