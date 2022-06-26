/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { IPath } from './IPath.js'

interface IExecutable {

    get exitCode(): number | null

    get savedStdoutPath(): IPath
    get savedStderrPath(): IPath

}

export type {
    IExecutable
}
