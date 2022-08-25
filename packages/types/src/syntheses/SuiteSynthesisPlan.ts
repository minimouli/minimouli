/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface SuiteSynthesisPlan {
    name: string
    tests: string[]
    suites: SuiteSynthesisPlan[]
}

export type {
    SuiteSynthesisPlan
}
