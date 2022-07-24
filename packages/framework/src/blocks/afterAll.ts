/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AfterAllHook } from '../hooks/AfterAllHook.js'
import { Tree } from '../tree/Tree.js'
import type { Hook, HookFn } from '@minimouli/types/blocks.js'

const afterAll: Hook = (fn: HookFn) => {

    const context = Tree.currentContext()
    const hook = new AfterAllHook(fn)

    context.addHook(hook)
}

export {
    afterAll
}
