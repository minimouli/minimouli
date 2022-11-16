/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ProjectSynthesis } from '@minimouli/types/syntheses'

interface ScanResult {
    keywords: Record<string, string>
    project: ProjectSynthesis
    repository: {
        host: string
        url: string
    }
}

export type {
    ScanResult
}
