/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { OrganizationEntity } from './organization.entity.js'
import type { HttpClient } from '../http-client.js'
import type { ProjectResDto } from '../dto/project.res.dto.js'

class ProjectEntity {

    public readonly id: string
    public readonly name: string
    public readonly displayName: string
    public readonly cycle: number
    public readonly organization: OrganizationEntity | undefined
    public readonly uri: string
    public readonly updatedAt: Date
    public readonly createdAt: Date

    constructor(httpClient: HttpClient, response: ProjectResDto) {
        this.id = response.id
        this.name = response.name
        this.displayName = response.displayName
        this.cycle = response.cycle
        if (response.organization !== undefined)
            this.organization = new OrganizationEntity(httpClient, response.organization)
        this.uri = response.uri
        this.updatedAt = new Date(response.updatedAt)
        this.createdAt = new Date(response.createdAt)
    }

}

export {
    ProjectEntity
}
