/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'reflect-metadata'
import { INJECTED_DEPENDENCIES_METADATA } from '../constants.js'
import type { Class } from '../types/class.type.js'
import type { DependencyMetadata } from '../types/dependency-metadata.type.js'

const Inject = <T extends object>(token: Class<T>) =>
    (target: object, key: string | symbol, index: number): void => {
        void key

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let dependencies: DependencyMetadata[] = Reflect.getMetadata(INJECTED_DEPENDENCIES_METADATA, target) ?? []
        dependencies = [...dependencies, { index, token }]

        Reflect.defineMetadata(INJECTED_DEPENDENCIES_METADATA, dependencies, target)
    }

export {
    Inject
}
