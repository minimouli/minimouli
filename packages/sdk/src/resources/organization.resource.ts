/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PagingResult } from '../paging-result.js'
import { OrganizationEntity } from '../entities/organization.entity.js'
import type { HttpClient } from '../http-client.js'
import type { OrganizationResDto } from '../dto/organization.res.dto.js'
import type { PagingResultResDto } from '../dto/paging-result.res.dto.js'
import type { PagingParameters } from '../types/parameters/paging.parameters.type.js'

class OrganizationResource {

    constructor(
        private readonly httpClient: HttpClient
    ) {}

    async get(id: string): Promise<OrganizationEntity> {
        const response = await this.httpClient.get<OrganizationResDto>(`/organization/${id}`)
        return new OrganizationEntity(this.httpClient, response)
    }

    async list(parameters: Partial<PagingParameters> = {}): Promise<PagingResult<OrganizationResDto, OrganizationEntity>> {

        const route = '/organizations'
        const limit = parameters.limit ?? 20
        const searchParams = new URLSearchParams()
        const createEntity = (response: OrganizationResDto, httpClient: HttpClient) => new OrganizationEntity(httpClient, response)

        searchParams.set('limit', limit.toString())
        if (parameters.beforeCursor !== undefined)
            searchParams.set('beforeCursor', parameters.beforeCursor)
        if (parameters.afterCursor !== undefined)
            searchParams.set('afterCursor', parameters.afterCursor)

        const response = await this.httpClient.get<PagingResultResDto<OrganizationResDto>>(`${route}?${searchParams.toString()}`)

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
    OrganizationResource
}
