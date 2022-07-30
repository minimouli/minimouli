/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ProcessFactory } from '@minimouli/process'
import { EpitechGithubDecoder } from './decoders/EpitechGithubDecoder.js'
import { EpitechSelfHostDecoder } from './decoders/EpitechSelfHostDecoder.js'
import type { Path } from '@minimouli/fs'
import type { ScanResult } from './ScanResult.js'

interface ScanSuccessResponse {
    result: ScanResult
    error: undefined
}

interface ScanFailureResponse {
    result: undefined
    error: string
}

interface GetRemoteOriginSuccessResponse {
    url: string
    error: undefined
}

interface GetRemoteOriginFailureResponse {
    url: undefined
    error: string
}

type ScanResponse = ScanSuccessResponse | ScanFailureResponse
type GetRemoteOriginResponse = GetRemoteOriginSuccessResponse | GetRemoteOriginFailureResponse

class Scanner {

    private decoders = [
        new EpitechGithubDecoder(),
        new EpitechSelfHostDecoder()
    ]

    constructor(private directory: Path) {}

    private async getRemoteOrigin(): Promise<GetRemoteOriginResponse> {

        return new Promise((resolve) => {

            const git = new ProcessFactory('git', ['config', '--get', 'remote.origin.url'])
                .cwd(this.directory)
                .stdio({
                    stdin: 'ignore',
                    stdout: 'pipe',
                    stderr: 'ignore'
                })
                .spawn()

            git.on('error', () => resolve({
                error: 'Cannot perform a directory scan. Please check if git is correctly installed',
                url: undefined
            }))

            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            git.on('exit', async (code) => {

                if (code !== 0) {
                    resolve({
                        error: 'The scanned directory is not a git repository',
                        url: undefined
                    })
                    return
                }

                if (git.stdout === undefined)
                    return

                const { contents } = await git.stdout.getContents()

                if (contents === null) {
                    resolve({
                        error: 'Cannot perform a directory scan',
                        url: undefined
                    })
                    return
                }

                resolve({
                    url: contents.toString().trim(),
                    error: undefined
                })
            })
        })
    }

    async scan(): Promise<ScanResponse> {

        const { url, error } = await this.getRemoteOrigin()

        if (url === undefined)
            return { error, result: undefined }

        for (const decoder of this.decoders) {

            const result = decoder.decode(url)

            if (result === undefined)
                continue

            return { result, error: undefined }
        }

        return {
            error: 'The remote url is not supported',
            result: undefined
        }
    }

}

export {
    Scanner
}
