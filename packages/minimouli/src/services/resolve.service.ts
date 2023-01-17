/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EventEmitter } from 'node:events'
import { isMinimouliClientError } from '@minimouli/sdk'
import { ResolveStage } from '../enums/resolve-stage.enum.js'
import type {
    Client,
    MoulinetteEntity,
    MoulinetteListParameters,
    MoulinetteSourceEntity
} from '@minimouli/sdk'
import type { ResolveServiceEvents } from '../types/events/resolve-service.events.type.js'
import type { ResolveServiceResponse } from '../types/responses/resolve-service.response.type.js'

class ResolveService {

    private eventEmitter = new EventEmitter()

    private abort = (message: string) => this.dispatchFromResponse([ResolveStage.Failed, { error: message }])

    async resolveMoulinetteByListParameters(client: Client, parameters: MoulinetteListParameters): Promise<void> {

        const select = (moulinette: MoulinetteEntity) => {
            void (async () => {
                await this.resolveMoulinetteSourceByMoulinetteEntity(client, moulinette)
            })()
        }

        const resolve = async (): Promise<ResolveServiceResponse> => {
            try {
                const pagingResult = await client.moulinettes.list(parameters)
                return [ResolveStage.ResolvingMoulinette, { pagingResult, select, abort: this.abort }]
            } catch (error: unknown) {

                if (isMinimouliClientError(error))
                    return [ResolveStage.Failed, { error: `Unable to retrieve the moulinette list (status: ${error.statusCode})` }]

                return [ResolveStage.Failed, { error: 'Unable to retrieve the moulinette list' }]
            }
        }

        const response = await resolve()
        this.dispatchFromResponse(response)
    }

    async resolveMoulinetteSourceByMoulinetteId(client: Client, id: string): Promise<void> {

        // eslint-disable-next-line unicorn/consistent-function-scoping
        const select = (moulinette: MoulinetteEntity) => (moulinetteSource: MoulinetteSourceEntity) => {
            this.dispatchFromResponse([ResolveStage.Resolved, {
                moulinette,
                moulinetteSource
            }])
        }

        const resolve = async (): Promise<ResolveServiceResponse> => {
            try {
                const moulinette = await client.moulinettes.get(id)
                const { sources } = moulinette

                if (sources === undefined)
                    return [ResolveStage.Failed, { error: 'Unable to retrieve the moulinette sources' }]

                return [ResolveStage.ResolvingMoulinetteSource, {
                    moulinette, sources, select: select(moulinette), abort: this.abort
                }]
            } catch (error: unknown) {

                if (isMinimouliClientError(error))
                    return [ResolveStage.Failed, { error: `Unable to retrieve the moulinette sources (status: ${error.statusCode})` }]

                return [ResolveStage.Failed, { error: 'Unable to retrieve the moulinette sources' }]
            }
        }

        const response = await resolve()
        this.dispatchFromResponse(response)
    }

    async resolveMoulinetteSourceByMoulinetteEntity(client: Client, moulinette: MoulinetteEntity): Promise<void> {
        await this.resolveMoulinetteSourceByMoulinetteId(client, moulinette.id)
    }

    on<E extends keyof ResolveServiceEvents>(event: E, listener: ResolveServiceEvents[E]): void {
        this.eventEmitter.on(event, listener)
    }

    once<E extends keyof ResolveServiceEvents>(event: E, listener: ResolveServiceEvents[E]): void {
        this.eventEmitter.once(event, listener)
    }

    removeListener<E extends keyof ResolveServiceEvents>(event: E, listener: ResolveServiceEvents[E]): void {
        this.eventEmitter.removeListener(event, listener)
    }

    private dispatchFromResponse(response: ResolveServiceResponse): void {

        const [stage, data] = response
        this.eventEmitter.emit('change', response)

        if (stage === ResolveStage.Failed)
            this.eventEmitter.emit('error', new Error(data.error))
    }

}

export {
    ResolveService
}
