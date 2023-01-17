/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AfterEachHook } from '../hooks/after-each.hook.js'
import { Tree } from '../tree/tree.js'
import type { Hook, HookFn } from '@minimouli/types/blocks'

const afterEach: Hook = (fn: HookFn) => {

    const context = Tree.currentContext()
    const hook = new AfterEachHook(fn)

    context.addHook(hook)
}

export {
    afterEach
}
