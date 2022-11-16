/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface MoulinetteConfig {
    rootDir: string
    binaries: Record<string, string>
    suites: {
        default: string[]
        [name: string]: string[]
    }
}

export type {
    MoulinetteConfig
}
