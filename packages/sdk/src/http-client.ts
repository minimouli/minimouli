/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import deepmerge from 'deepmerge'
import { Method } from './enums/method.enum.js'
import { MinimouliClientError } from './errors/minimouli-client.error.js'
import { request } from './helpers/request.helper.js'
import type { BaseResDto } from './dto/base.res.dto.js'
import type { RequestOptions } from './types/options/request.options.type.js'

class HttpClient {

    private readonly abortController = new AbortController()

    constructor(
        private readonly accessToken: string | undefined,
        public readonly baseUrl: string
    ) {}

    private async request<T>(method: Method, route: string, options: Partial<RequestOptions> = {}): Promise<T> {

        const authorizationHeader = this.accessToken !== undefined
            ? { Authorization: `Bearer ${this.accessToken}` }
            : {}

        const requestOptionsBase = {
            headers: {
                ...authorizationHeader
            },
            validateStatus: () => true
        }
        const requestOptions = {
            ...deepmerge(requestOptionsBase, options),
            // AbortSignal cannot be merged by deepmerge
            signal: this.abortController.signal
        }
        const url = new URL(route, this.baseUrl)

        const response = await request<BaseResDto<T>>(method, url, requestOptions)

        if (response.status === 'failure')
            throw new MinimouliClientError(response)

        return response.data
    }

    async get<T>(route: string, options: Partial<RequestOptions> = {}): Promise<T> {
        return this.request<T>(Method.Get, route, options)
    }

    async post<T>(route: string, options: Partial<RequestOptions> = {}): Promise<T> {
        return this.request<T>(Method.Post, route, options)
    }

    async put<T>(route: string, options: Partial<RequestOptions> = {}): Promise<T> {
        return this.request<T>(Method.Put, route, options)
    }

    async patch<T>(route: string, options: Partial<RequestOptions> = {}): Promise<T> {
        return this.request<T>(Method.Patch, route, options)
    }

    async delete<T>(route: string, options: Partial<RequestOptions> = {}): Promise<T> {
        return this.request<T>(Method.Delete, route, options)
    }

    abortAllRequests(): void {
        this.abortController.abort()
    }

}

export {
    HttpClient
}
