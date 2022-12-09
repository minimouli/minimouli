/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EventEmitter } from 'node:events'
import { isMinimouliClientError } from '@minimouli/sdk'
import { Stage } from '../enums/stage.enum.js'
import type { Client, MoulinetteEntity, MoulinetteListParameters, MoulinetteSourceEntity } from '@minimouli/sdk'
import type { Callable } from '@minimouli/types'
import type { ServicesResponse } from '../types/services-response.type.js'
import type { ResolveServiceEvents } from '../types/events/resolve-service.events.type.js'

type SelectMoulinetteFn = Callable<[MoulinetteEntity]>
type SelectMoulinetteSourceFn = Callable<[MoulinetteSourceEntity]>
type InformFn = Callable<[string]>
type AbortFn = Callable<[string]>

class ResolveService {

    private eventEmitter = new EventEmitter()

    private inform = (message: string) => this.handleInform(message)
    private abort = (message: string) => this.handleAbort(message)

    async resolveMoulinette(
        client: Client,
        parameters: MoulinetteListParameters
    ): Promise<void> {

        const select = (moulinette: MoulinetteEntity) => {
            void (async () => {
                this.eventEmitter.emit('moulinetteResolved', { moulinette })
                await this.resolveMoulinetteSource(client, moulinette)
            })()
        }

        const response = await this.doResolveMoulinette(client, parameters, select, this.inform, this.abort)
        this.dispatchEventsFromResponse(response)
    }

    async resolveMoulinetteSource(
        client: Client,
        moulinette: MoulinetteEntity
    ): Promise<void> {

        const select = (moulinetteSource: MoulinetteSourceEntity) => {
            this.eventEmitter.emit('moulinetteSourceResolved', { moulinette, moulinetteSource })
        }

        const response = await this.doResolveMoulinetteSource(client, moulinette, select, this.inform, this.abort)
        this.dispatchEventsFromResponse(response)
    }

    private async doResolveMoulinette(
        client: Client,
        parameters: MoulinetteListParameters,
        select: SelectMoulinetteFn,
        inform: InformFn,
        abort: AbortFn
    ): Promise<ServicesResponse> {
        try {
            const pagingResult = await client.moulinettes.list(parameters)
            return [Stage.ResolvingMoulinette, { pagingResult, select, inform, abort }]
        } catch (error: unknown) {

            if (isMinimouliClientError(error))
                return [Stage.Failed, { error: `Unable to retrieve the moulinette list (status: ${error.statusCode})` }]

            return [Stage.Failed, { error: 'Unable to retrieve the moulinette list' }]
        }
    }

    private async doResolveMoulinetteSource(
        client: Client,
        moulinette: MoulinetteEntity,
        select: SelectMoulinetteSourceFn,
        inform: InformFn,
        abort: AbortFn
    ): Promise<ServicesResponse> {
        try {
            const { sources } = await client.moulinettes.get(moulinette.id)

            if (sources === undefined)
                return [Stage.Failed, { error: 'Unable to retrieve the moulinette sources' }]

            return [Stage.ResolvingMoulinetteSource, {
                moulinette, sources, select, inform, abort
            }]
        } catch (error: unknown) {

            if (isMinimouliClientError(error))
                return [Stage.Failed, { error: `Unable to retrieve the moulinette sources (status: ${error.statusCode})` }]

            return [Stage.Failed, { error: 'Unable to retrieve the moulinette sources' }]
        }
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

    private dispatchEventsFromResponse(response: ServicesResponse): void {

        const [stage, data] = response
        this.eventEmitter.emit('change', response)

        switch (stage) {
            case Stage.ResolvingMoulinette:
                this.eventEmitter.emit('resolvingMoulinette', data)
                break
            case Stage.ResolvingMoulinetteSource:
                this.eventEmitter.emit('resolvingMoulinetteSource', data)
                break
            case Stage.Failed:
                this.eventEmitter.emit('error', new Error(data.error))
                break
            default:
        }
    }

    private handleInform(message: string): void {
        this.eventEmitter.emit('info', { message })
    }

    private handleAbort(message: string): void {
        this.dispatchEventsFromResponse([Stage.Failed, { error: message }])
    }

}

export {
    ResolveService
}
