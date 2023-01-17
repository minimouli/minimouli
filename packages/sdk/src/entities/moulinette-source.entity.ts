/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fromString } from '../helpers/version.helper.js'
import type { Version } from '@minimouli/types'
import type { HttpClient } from '../http-client.js'
import type { MoulinetteSourceResDto } from '../dto/moulinette-source.res.dto.js'

class MoulinetteSourceEntity {

    public readonly version: Version
    public readonly tarball: URL
    public readonly checksum: string
    public readonly rules: string[]
    public readonly use: number
    public readonly isDeprecated: boolean
    public readonly updatedAt: Date
    public readonly createdAt: Date

    constructor(httpClient: HttpClient, response: MoulinetteSourceResDto) {
        void httpClient

        this.version = fromString(response.version)
        this.tarball = new URL(response.tarball)
        this.checksum = response.checksum
        this.rules = response.rules
        this.use = response.use
        this.isDeprecated = response.isDeprecated
        this.updatedAt = new Date(response.updatedAt)
        this.createdAt = new Date(response.createdAt)
    }

}

export {
    MoulinetteSourceEntity
}
