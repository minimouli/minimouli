/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

enum Trigger {
    BEFORE_SUITE_IS_EXECUTED = 0,
    BEFORE_TEST_IS_EXECUTED = 1,
    AFTER_TEST_IS_EXECUTED = 2,
    AFTER_SUITE_IS_EXECUTED = 3
}

interface Hook {

    execute(): void

    get triggers(): Trigger[]
    get isAppliedOnChildren(): boolean

}

export {
    Trigger
}
export type {
    Hook
}
