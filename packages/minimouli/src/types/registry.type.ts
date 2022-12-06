/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Version } from '@minimouli/types'

interface Registry {
    moulinettes: RegistryEntry[]
}

interface RegistryEntry {
    id: string
    version: Version
    path: string
    rules: string[]
    information: {
        organizationName: string
        projectName: string
        projectCycle: number
    }
}

export type {
    Registry,
    RegistryEntry
}
