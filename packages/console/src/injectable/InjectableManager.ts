/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { INJECTED_DEPENDENCIES_METADATA } from '../constants.js'
import type { Class } from '../types/Class.js'
import type { DependencyMetadata } from '../types/DependencyMetadata.js'
import type { Injectable, InjectableFactory } from '../types/Injectable.js'

class InjectableManager {

    private injectables = new Map<Class, object>()

    set<T extends object>(token: Class<T>, instance: T): void {
        this.injectables.set(token, instance)
    }

    get<T extends object>(token: Class<T>): T {

        const instance = this.injectables.get(token)

        if (instance === undefined)
            throw new Error('Cannot resolve dependency')

        return instance as T
    }

    registerByClass(token: Class): void {
        this.set(token, this.instantiate(token))
    }

    async registerByFactory(factory: InjectableFactory): Promise<void> {

        const { token, useFactory } = factory
        const instance = await useFactory(this)

        this.set(token, instance)
    }

    async register(injectable: Injectable): Promise<void> {
        if (typeof injectable === 'object')
            await this.registerByFactory(injectable)
        else
            this.registerByClass(injectable)
    }

    instantiate<T extends object>(token: Class<T>): T {

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const dependenciesMetadata: DependencyMetadata[] = Reflect.getMetadata(INJECTED_DEPENDENCIES_METADATA, token) ?? []
        const sortedDependencies = dependenciesMetadata.sort((a, b) => a.index - b.index)
        const dependencies = sortedDependencies.map(({ token: dependencyToken }) => this.get(dependencyToken))

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Reflect.construct(token, dependencies)
    }

}

export {
    InjectableManager
}
