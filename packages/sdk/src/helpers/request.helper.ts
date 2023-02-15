/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios'
import { Method } from '../enums/method.enum.js'
import type { RequestOptions } from '../types/options/request.options.type.js'

const request = async <T>(
    method: Method,
    url: URL,
    options: Partial<RequestOptions> = {}
): Promise<T> => {

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
        'User-Agent': 'minimouli-sdk/1.0'
    }
    const data = options.body ?? {}
    const validateStatus = options.validateStatus ?? ((status) => status >= 200 && status < 300)

    const response = await axios.request<T>({
        method,
        url: url.href,
        headers,
        data,
        signal: options.signal,
        validateStatus
    })

    return response.data
}

const GET = <T>(url: URL, options: Partial<RequestOptions> = {}) =>
    request<T>(Method.Get, url, options)

const POST = <T>(url: URL, options: Partial<RequestOptions> = {}) =>
    request<T>(Method.Post, url, options)

const PUT = <T>(url: URL, options: Partial<RequestOptions> = {}) =>
    request<T>(Method.Put, url, options)

const PATCH = <T>(url: URL, options: Partial<RequestOptions> = {}) =>
    request<T>(Method.Patch, url, options)

const DELETE = <T>(url: URL, options: Partial<RequestOptions> = {}) =>
    request<T>(Method.Delete, url, options)

export {
    request,
    GET,
    POST,
    PUT,
    PATCH,
    DELETE
}
