/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AccountEntity } from './account.entity.js'
import { MoulinetteEntity } from './moulinette.entity.js'
import type { SuiteSynthesis } from '@minimouli/types/syntheses'
import type { HttpClient } from '../http-client.js'
import type { RunResDto } from '../dto/run.res.dto.js'

class RunEntity {

    public readonly id: string
    public readonly suites: SuiteSynthesis
    public readonly moulinette: MoulinetteEntity
    public readonly moulinetteVersion: string
    public readonly owner: AccountEntity | undefined
    public readonly uri: string
    public readonly updatedAt: Date
    public readonly createdAt: Date

    constructor(httpClient: HttpClient, response: RunResDto) {
        this.id = response.id
        this.suites = response.suites
        this.moulinette = new MoulinetteEntity(httpClient, response.moulinette)
        this.moulinetteVersion = response.moulinetteVersion
        if (response.owner !== undefined)
            this.owner = new AccountEntity(httpClient, response.owner)
        this.uri = response.uri
        this.updatedAt = new Date(response.updatedAt)
        this.createdAt = new Date(response.createdAt)
    }

}

export {
    RunEntity
}
