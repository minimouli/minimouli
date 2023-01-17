/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HttpClient } from './http-client.js'
import type { PagingResultResDto } from './dto/paging-result.res.dto.js'

type CreateEntityFn<Dto, Entity> = (response: Dto, httpClient: HttpClient) => Entity

class PagingResult<Dto, Entity> {

    public readonly items: Entity[]

    private readonly httpClient: HttpClient
    private readonly route: string
    private readonly limit: number
    private readonly beforeCursor: string | null
    private readonly afterCursor: string | null
    private readonly searchParams: URLSearchParams
    private readonly createEntity: CreateEntityFn<Dto, Entity>

    constructor(
        httpClient: HttpClient,
        response: PagingResultResDto<Dto>,
        route: string,
        limit: number,
        searchParams: URLSearchParams,
        createEntity: CreateEntityFn<Dto, Entity>
    ) {
        this.items = response.items.map((item) => createEntity(item, httpClient))
        this.httpClient = httpClient
        this.route = route
        this.limit = limit
        this.beforeCursor = response.beforeCursor
        this.afterCursor = response.afterCursor
        this.searchParams = searchParams
        this.createEntity = createEntity
    }

    async prev(): Promise<PagingResult<Dto, Entity>> {

        if (this.beforeCursor === null)
            throw new Error('Cannot seek the previous page')

        const searchParams = new URLSearchParams(this.searchParams)
        searchParams.set('limit', this.limit.toString())
        searchParams.set('beforeCursor', this.beforeCursor)

        const route = `${this.route}?${searchParams.toString()}`
        const response = await this.httpClient.get<PagingResultResDto<Dto>>(route)

        return new PagingResult<Dto, Entity>(
            this.httpClient,
            response,
            this.route,
            this.limit,
            this.searchParams,
            this.createEntity
        )
    }

    async next(): Promise<PagingResult<Dto, Entity>> {

        if (this.afterCursor === null)
            throw new Error('Cannot seek the next page')

        const searchParams = new URLSearchParams(this.searchParams)
        searchParams.set('limit', this.limit.toString())
        searchParams.set('afterCursor', this.afterCursor)

        const route = `${this.route}?${searchParams.toString()}`
        const response = await this.httpClient.get<PagingResultResDto<Dto>>(route)

        return new PagingResult<Dto, Entity>(
            this.httpClient,
            response,
            this.route,
            this.limit,
            this.searchParams,
            this.createEntity
        )
    }

    hasPrev(): boolean {
        return this.beforeCursor !== null
    }

    hasNext(): boolean {
        return this.afterCursor !== null
    }

}

export {
    PagingResult
}
