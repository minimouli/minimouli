/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AccountEntity } from './account.entity.js'
import { MoulinetteSourceEntity } from './moulinette-source.entity.js'
import { ProjectEntity } from './project.entity.js'
import type { HttpClient } from '../http-client.js'
import type { MoulinetteResDto } from '../dto/moulinette.res.dto.js'

class MoulinetteEntity {

    public readonly id: string
    public readonly repository: URL
    public readonly isOfficial: boolean
    public readonly use: number
    public readonly project: ProjectEntity
    public readonly sources: MoulinetteSourceEntity[] | undefined
    public readonly maintainers: AccountEntity[]
    public readonly uri: string
    public readonly updatedAt: Date
    public readonly createdAt: Date

    constructor(httpClient: HttpClient, response: MoulinetteResDto) {
        this.id = response.id
        this.repository = new URL(response.repository)
        this.isOfficial = response.isOfficial
        this.use = response.use
        this.project = new ProjectEntity(httpClient, response.project)
        if (response.sources !== undefined)
            this.sources = response.sources.map((source) => new MoulinetteSourceEntity(httpClient, source))
        this.maintainers = response.maintainers.map((maintainer) => new AccountEntity(httpClient, maintainer))
        this.uri = response.uri
        this.updatedAt = new Date(response.updatedAt)
        this.createdAt = new Date(response.createdAt)
    }

}

export {
    MoulinetteEntity
}
