/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BeforeEachHook } from '../hooks/BeforeEachHook.js'
import { Tree } from '../tree/Tree.js'
import type { Hook, HookFn } from '@minimouli/types/blocks'

const beforeEach: Hook = (fn: HookFn) => {

    const context = Tree.currentContext()
    const hook = new BeforeEachHook(fn)

    context.addHook(hook)
}

export {
    beforeEach
}
