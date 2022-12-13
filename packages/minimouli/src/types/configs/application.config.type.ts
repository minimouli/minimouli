/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Version } from '@minimouli/types'

interface ApplicationConfig {
    app: {
        name: string
        cli: string
        version: Version
        links: {
            website: string
            repository: {
                organization: string
                project: string
            }
            issues: string
        }
    }
    api: {
        baseUrl: string
    }
}

export type {
    ApplicationConfig
}
