/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PagingResult } from '../paging-result.js'
import { ProjectEntity } from '../entities/project.entity.js'
import type { HttpClient } from '../http-client.js'
import type { PagingResultResDto } from '../dto/paging-result.res.dto.js'
import type { ProjectResDto } from '../dto/project.res.dto.js'
import type { PagingParameters } from '../types/parameters/paging.parameters.type.js'

class ProjectResource {

    constructor(
        private readonly httpClient: HttpClient
    ) {}

    async get(id: string): Promise<ProjectEntity> {
        const response = await this.httpClient.get<ProjectResDto>(`/project/${id}`)
        return new ProjectEntity(this.httpClient, response)
    }

    async list(parameters: Partial<PagingParameters> = {}): Promise<PagingResult<ProjectResDto, ProjectEntity>> {

        const route = '/projects'
        const limit = parameters.limit ?? 20
        const searchParams = new URLSearchParams()
        const createEntity = (response: ProjectResDto, httpClient: HttpClient) => new ProjectEntity(httpClient, response)

        searchParams.set('limit', limit.toString())
        if (parameters.beforeCursor !== undefined)
            searchParams.set('beforeCursor', parameters.beforeCursor)
        if (parameters.afterCursor !== undefined)
            searchParams.set('afterCursor', parameters.afterCursor)

        const response = await this.httpClient.get<PagingResultResDto<ProjectResDto>>(`${route}?${searchParams.toString()}`)

        return new PagingResult(
            this.httpClient,
            response,
            route,
            limit,
            new URLSearchParams(),
            createEntity
        )
    }

}

export {
    ProjectResource
}
