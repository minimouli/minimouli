/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { OrganizationResDto } from './organization.res.dto.js'
import type { EntityType } from '../enums/entity-type.enum.js'

interface ProjectResDto {
    object: EntityType.Project
    id: string
    name: string
    displayName: string
    cycle: number
    organization?: OrganizationResDto
    uri: string
    updatedAt: string
    createdAt: string
}

export type {
    ProjectResDto
}
