/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PagingResult } from '../paging-result.js'
import { MoulinetteEntity } from '../entities/moulinette.entity.js'
import type { HttpClient } from '../http-client.js'
import type { MoulinetteResDto } from '../dto/moulinette.res.dto.js'
import type { PagingResultResDto } from '../dto/paging-result.res.dto.js'
import type { MoulinetteListParameter } from '../types/parameters/moulinette-list.parameter.type.js'
import type { PagingParameter } from '../types/parameters/paging.parameter.type.js'

class MoulinetteResource {

    constructor(
        private readonly httpClient: HttpClient
    ) {}

    async get(id: string): Promise<MoulinetteEntity> {
        const response = await this.httpClient.get<MoulinetteResDto>(`/moulinette/${id}`)
        return new MoulinetteEntity(this.httpClient, response)
    }

    async list(parameters: Partial<MoulinetteListParameter & PagingParameter> = {}): Promise<PagingResult<MoulinetteResDto, MoulinetteEntity>> {

        const route = '/moulinettes'
        const limit = parameters.limit ?? 20
        const createEntity = (response: MoulinetteResDto, httpClient: HttpClient) => new MoulinetteEntity(httpClient, response)

        const baseSearchParams = new URLSearchParams()

        if (parameters.isOfficial !== undefined)
            baseSearchParams.set('isOfficial', parameters.isOfficial ? 'true' : 'false')
        if (parameters.projectName !== undefined)
            baseSearchParams.set('projectName', parameters.projectName)
        if (parameters.projectCycle !== undefined)
            baseSearchParams.set('projectCycle', parameters.projectCycle.toString())
        if (parameters.organizationName !== undefined)
            baseSearchParams.set('organizationName', parameters.organizationName)

        const searchParams = new URLSearchParams(baseSearchParams)

        searchParams.set('limit', limit.toString())
        if (parameters.beforeCursor !== undefined)
            searchParams.set('beforeCursor', parameters.beforeCursor)
        if (parameters.afterCursor !== undefined)
            searchParams.set('afterCursor', parameters.afterCursor)

        const response = await this.httpClient.get<PagingResultResDto<MoulinetteResDto>>(`${route}?${searchParams.toString()}`)

        return new PagingResult(
            this.httpClient,
            response,
            route,
            limit,
            baseSearchParams,
            createEntity
        )
    }

}

export {
    MoulinetteResource
}
