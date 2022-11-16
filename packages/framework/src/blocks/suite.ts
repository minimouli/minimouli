/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Tree } from '../tree/Tree.js'
import { Suite } from '../tree/Suite.js'
import { SuiteContext } from '../tree/contexts/SuiteContext.js'
import type { Suite as SuiteBlock, SuiteFn } from '@minimouli/types/blocks'

const suite: SuiteBlock = (name: string, fn: SuiteFn) => {

    const context = new SuiteContext(Tree.currentContext(), name)
    const newSuite = new Suite(context, name)

    Tree.currentContext().addSuite(newSuite)

    Tree.changeContext(context)
    fn()
    Tree.popContext()
}

export {
    suite
}
