/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RunEntity } from '../entities/run.entity.js'
import type { SuiteSynthesis } from '@minimouli/types/syntheses'
import type { HttpClient } from '../http-client.js'
import type { RunResDto } from '../dto/run.res.dto.js'

class RunResource {

    constructor(
        private readonly httpClient: HttpClient
    ) {}

    async get(id: string): Promise<RunEntity> {
        const response = await this.httpClient.get<RunResDto>(`/run/${id}`)
        return new RunEntity(this.httpClient, response)
    }

    async post(suites: SuiteSynthesis[], moulinette: string): Promise<RunEntity> {

        const response = await this.httpClient.post<RunResDto>('/run', {
            body: {
                suites,
                moulinette
            }
        })

        return new RunEntity(this.httpClient, response)
    }

}

export {
    RunResource
}
