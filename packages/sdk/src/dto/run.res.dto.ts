/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { SuiteSynthesis } from '@minimouli/types/syntheses'
import type { AccountResDto } from './account.res.dto.js'
import type { MoulinetteResDto } from './moulinette.res.dto.js'
import type { EntityType } from '../enums/entity-type.enum.js'

interface RunResDto {
    object: EntityType.Run
    id: string
    suites: SuiteSynthesis[]
    moulinette: MoulinetteResDto
    moulinetteVersion: string
    owner?: AccountResDto
    uri: string
    updatedAt: string
    createdAt: string
}

export type {
    RunResDto
}
