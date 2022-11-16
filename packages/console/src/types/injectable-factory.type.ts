/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Class } from './class.type.js'
import type { InjectableManager } from '../injectable/injectable-manager.js'

interface InjectableFactory<T extends object = object> {
    useFactory: (injectableManager: InjectableManager) => T | Promise<T>
    token: Class<T>
}

export type {
    InjectableFactory
}
