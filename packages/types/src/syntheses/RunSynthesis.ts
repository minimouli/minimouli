/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ProjectSynthesis } from './ProjectSynthesis.js'
import type { SuiteSynthesis } from './SuiteSynthesis.js'

interface RunSynthesis {
    project: ProjectSynthesis
    suites: SuiteSynthesis[]
}

export type {
    RunSynthesis
}
