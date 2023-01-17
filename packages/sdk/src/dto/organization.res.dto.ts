/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { EntityType } from '../enums/entity-type.enum.js'

interface OrganizationResDto {
    object: EntityType.Organization
    id: string
    name: string
    displayName: string
    uri: string
    updatedAt: string
    createdAt: string
}

export type {
    OrganizationResDto
}
