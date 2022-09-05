/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Class } from './Class.js'
import type { InjectableManager } from '../injectable/InjectableManager.js'

interface InjectableFactory<T extends object = object> {
    useFactory: (injectableManager: InjectableManager) => T | Promise<T>
    token: Class<T>
}

type Injectable<T extends object = object> = Class<T> | InjectableFactory<T>

export type {
    Injectable,
    InjectableFactory
}
