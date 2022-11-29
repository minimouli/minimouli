/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { EntityType } from '../enums/entity-type.enum.js'

interface MoulinetteSourceResDto {
    object: EntityType.MoulinetteSource
    version: string
    tarball: string
    checksum: string
    rules: string[]
    use: number
    isDeprecated: boolean
    updatedAt: string
    createdAt: string
}

export type {
    MoulinetteSourceResDto
}
