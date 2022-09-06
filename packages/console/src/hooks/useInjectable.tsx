/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext } from 'react'
import { InjectableContext } from '../contexts/injectable.context.js'
import type { Class } from '../types/Class.js'

const useInjectable = <T extends object>(token: Class<T>): T => {

    const manager = useContext(InjectableContext)

    if (manager === undefined)
        throw new Error('Cannot resolve dependency')

    return manager.get(token)
}

export {
    useInjectable
}
