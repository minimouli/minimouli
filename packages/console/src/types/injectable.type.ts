/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Class } from './class.type.js'
import type { InjectableFactory } from './injectable-factory.type.js'

type Injectable<T extends object = object> = Class<T> | InjectableFactory<T>

export type {
    Injectable
}
