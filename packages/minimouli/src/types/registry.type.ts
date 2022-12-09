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
    checksum: string
    information: {
        organization: {
            name: string
        }
        project: {
            name: string
            cycle: number
        }
    }
    installedAt: string
}

export type {
    Registry,
    RegistryEntry
}
