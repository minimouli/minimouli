/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ProjectSynthesis } from './project.synthesis.js'
import type { SuiteSynthesis } from './suite.synthesis.js'

interface RunSynthesis {
    project: ProjectSynthesis
    suites: SuiteSynthesis[]
}

export type {
    RunSynthesis
}
