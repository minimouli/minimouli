/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Test } from '../tree/Test.js'
import { Tree } from '../tree/Tree.js'
import type { Test as TestBlock, TestFn } from '@minimouli/types/blocks'

const test: TestBlock = (name: string, fn: TestFn) => {

    const context = Tree.currentContext()
    const newTest = new Test(name, context.path, fn)

    context.addTest(newTest)
}

export {
    test
}
