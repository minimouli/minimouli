/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import { createContext } from 'react'
import type { InjectableManager } from '../injectable/InjectableManager.js'

type InjectableContextValue = InjectableManager | undefined

const InjectableContext = createContext<InjectableContextValue>(undefined)

export {
    InjectableContext
}
export type {
    InjectableContextValue
}
