/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HttpClient } from '../http-client.js'
import type { OrganizationResDto } from '../dto/organization.res.dto.js'

class OrganizationEntity {

    public readonly id: string
    public readonly name: string
    public readonly displayName: string
    public readonly uri: string
    public readonly updatedAt: Date
    public readonly createdAt: Date

    constructor(httpClient: HttpClient, response: OrganizationResDto) {
        void httpClient

        this.id = response.id
        this.name = response.name
        this.displayName = response.displayName
        this.uri = response.uri
        this.updatedAt = new Date(response.updatedAt)
        this.createdAt = new Date(response.createdAt)
    }

}

export {
    OrganizationEntity
}
