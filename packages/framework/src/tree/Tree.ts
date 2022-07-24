/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GlobalContext } from './contexts/GlobalContext.js'
import type { Context } from './contexts/Context.js'

const contexts: Context[] = [new GlobalContext()]

const Tree = {

    currentContext: (): Context => {

        const context = contexts.at(-1)

        if (context === undefined)
            throw new Error('No context available')

        return context
    },

    changeContext: (context: Context): void => {
        contexts.push(context)
    },

    popContext: (): void => {
        contexts.pop()
    }

}

export {
    Tree
}
