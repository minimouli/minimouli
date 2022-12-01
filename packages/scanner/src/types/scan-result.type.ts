/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface ScanResult {
    organization: {
        name: string
    }
    project: {
        name: string
        directories: string[]
    }
    repository: {
        host: string
        url: string
    }
}

export type {
    ScanResult
}
