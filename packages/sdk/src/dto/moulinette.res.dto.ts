/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { AccountResDto } from './account.res.dto.js'
import type { MoulinetteSourceResDto } from './moulinette-source.res.dto.js'
import type { ProjectResDto } from './project.res.dto.js'
import type { EntityType } from '../enums/entity-type.enum.js'

interface MoulinetteResDto {
    object: EntityType.Moulinette
    id: string
    repository: string
    isOfficial: boolean
    use: number
    project: ProjectResDto
    sources?: MoulinetteSourceResDto[]
    maintainers: AccountResDto[]
    uri: string
    updatedAt: string
    createdAt: string
}

export type {
    MoulinetteResDto
}
