/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EventEmitter } from 'node:events'
import { Directory, Path } from '@minimouli/fs'
import { ProcessFactory } from '@minimouli/process'
import axios from 'axios'
import tar from 'tar'
import { InstallStage } from '../enums/install-stage.enum.js'
import type { Readable } from 'node:stream'
import type { MoulinetteEntity, MoulinetteSourceEntity } from '@minimouli/sdk'
import type { InstallServiceEvents } from '../types/events/install-service.events.type.js'
import type { InstallServiceResponse } from '../types/responses/install-service.response.type.js'

class InstallService {

    private readonly abortController = new AbortController()
    private eventEmitter = new EventEmitter()

    async install(moulinette: MoulinetteEntity, moulinetteSource: MoulinetteSourceEntity): Promise<void> {

        const destination = Path.app()
            .join('moulinettes')
            .join(`${moulinette.id}@${moulinetteSource.version.join('.')}`)

        const response1 = await this.createMoulinetteDirectory(destination)
        const [stage1] = response1

        this.dispatchEventsFromResponse(response1)
        if (stage1 === InstallStage.Failed)
            return

        const response2 = await this.downloadMoulinetteTarball(moulinetteSource, destination)
        const [stage2] = response2

        this.dispatchEventsFromResponse(response2)
        if (stage2 === InstallStage.Failed)
            return

        const response3 = await this.installMoulinetteDependencies(moulinette, moulinetteSource, destination)
        this.dispatchEventsFromResponse(response3)
    }

    private async createMoulinetteDirectory(destination: Path): Promise<InstallServiceResponse> {

        const destinationDirectory = new Directory(destination)
        const { error: error1 } = await destinationDirectory.mkdir({
            recursive: true
        })

        if (error1 !== undefined)
            return [InstallStage.Failed, { error: 'Unable to create the moulinette directory' }]

        return [InstallStage.Downloading, {
            loaded: 0,
            total: undefined,
            completed: undefined
        }]
    }

    private async downloadMoulinetteTarball(moulinetteSource: MoulinetteSourceEntity, destination: Path): Promise<InstallServiceResponse> {

        let tarball: Readable

        try {
            ({ data: tarball } = await axios.get<Readable>(moulinetteSource.tarball.href, {
                responseType: 'stream',
                signal: this.abortController.signal,
                onDownloadProgress: (event) => {

                    const loaded = event.loaded
                    const total = event.total
                    const completed = event.total !== undefined && event.total > 0
                        ? event.loaded / event.total
                        : undefined

                    this.dispatchEventsFromResponse([InstallStage.Downloading, {
                        loaded, total, completed
                    }])
                }
            }))
        } catch (error: unknown) {

            // eslint-disable-next-line import/no-named-as-default-member
            if (axios.isAxiosError(error) && error.status !== undefined)
                return [InstallStage.Failed, { error: `Unable to download the moulinette tarball (status: ${error.status})` }]

            return [InstallStage.Failed, { error: 'Unable to download the moulinette tarball' }]
        }

        const writable = tar.extract({
            strip: 1,
            cwd: destination.toString()
        })

        return new Promise((resolve) => {

            tarball.pipe(writable)

            tarball.on('error', () => resolve([InstallStage.Failed, {
                error: 'Unable to extract the moulinette tarball'
            }]))
            tarball.on('close', () => resolve([InstallStage.Installing, {}]))
        })
    }

    private async installMoulinetteDependencies(
        moulinette: MoulinetteEntity,
        moulinetteSource: MoulinetteSourceEntity,
        moulinettePath: Path
    ): Promise<InstallServiceResponse> {

        const { process: node, error } = await new ProcessFactory('npm', ['install', '--production'])
            .cwd(moulinettePath)
            .stdio({
                stdin: 'ignore',
                stdout: 'ignore',
                stderr: 'ignore'
            })
            .spawn()

        if (error !== undefined)
            return [InstallStage.Failed, { error: 'Unable to install moulinette dependencies, please check if npm is correctly installed' }]

        return new Promise((resolve) => {

            node.on('exit', (exitCode: number | null) => {

                if (exitCode === null || exitCode !== 0)
                    resolve([InstallStage.Failed, { error: 'Unable to install moulinette dependencies' }])
                else
                    resolve([InstallStage.Installed, {
                        moulinette,
                        moulinetteSource,
                        moulinettePath
                    }])
            })
        })
    }

    on<E extends keyof InstallServiceEvents>(event: E, listener: InstallServiceEvents[E]): void {
        this.eventEmitter.on(event, listener)
    }

    once<E extends keyof InstallServiceEvents>(event: E, listener: InstallServiceEvents[E]): void {
        this.eventEmitter.once(event, listener)
    }

    removeListener<E extends keyof InstallServiceEvents>(event: E, listener: InstallServiceEvents[E]): void {
        this.eventEmitter.removeListener(event, listener)
    }

    abortAllRequests(): void {
        this.abortController.abort()
    }

    private dispatchEventsFromResponse(response: InstallServiceResponse): void {

        const [stage, data] = response
        this.eventEmitter.emit('change', response)

        switch (stage) {
            case InstallStage.Installed:
                this.eventEmitter.emit('installed', data)
                break
            case InstallStage.Failed:
                this.eventEmitter.emit('error', new Error(data.error))
                break
            default:
        }
    }

}

export {
    InstallService
}
