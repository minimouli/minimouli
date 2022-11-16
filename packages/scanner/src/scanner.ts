/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ProcessFactory } from '@minimouli/process'
import { Descriptor } from '@minimouli/types/stream'
import { EpitechGitHubDecoder } from './decoders/epitech-github.decoder.js'
import { EpitechSelfHostedDecoder } from './decoders/epitech-self-hosted.decoder.js'
import type { Path } from '@minimouli/fs'
import type { ScanResult } from './scan-result.js'

type ScanResponse =
    | {
        result: ScanResult
        error?: undefined
    }
    | {
        error: string
        result?: undefined
    }

type GetRemoteOriginResponse =
    | {
        url: string
        error?: undefined
    }
    | {
        error: string
        url?: undefined
    }

class Scanner {

    private decoders = [
        new EpitechGitHubDecoder(),
        new EpitechSelfHostedDecoder()
    ]

    constructor(private directory: Path) {}

    private async getRemoteOrigin(): Promise<GetRemoteOriginResponse> {

        const { process: git, error: error1 } = await new ProcessFactory('git', ['config', '--get', 'remote.origin.url'])
            .cwd(this.directory)
            .stdio({
                stdin: 'ignore',
                stdout: 'pipe',
                stderr: 'ignore'
            })
            .spawn()

        if (error1 !== undefined)
            return { error: 'Cannot perform a directory scan, please check if git is correctly installed' }

        const { code, output, error: error2 } = await git.wait({ descriptor: Descriptor.STDOUT })

        if (code !== 0)
            return { error: 'The scanned directory is probably not a git repository' }

        if (error2 !== undefined || output === undefined || output === null)
            return { error: 'Cannot perform a directory scan' }

        return {
            url: output.toString().trim()
        }
    }

    async scan(): Promise<ScanResponse> {

        const { url, error } = await this.getRemoteOrigin()

        if (url === undefined)
            return { error }

        for (const decoder of this.decoders) {

            const result = decoder.decode(url)

            if (result === undefined)
                continue

            return { result }
        }

        return { error: 'The remote url is not supported' }
    }

}

export {
    Scanner
}
export type {
    ScanResponse
}
