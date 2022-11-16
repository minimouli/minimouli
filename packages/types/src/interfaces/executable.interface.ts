/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { PathInterface } from './path.interface.js'

interface ExecutableInterface {

    get exitCode(): number | null

    get savedStdoutPath(): PathInterface
    get savedStderrPath(): PathInterface

}

export type {
    ExecutableInterface
}
