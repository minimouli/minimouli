/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ProcessFactory } from '@minimouli/process'
import { Descriptor } from '@minimouli/types/stream.js'
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

        const { process: git, error: error1 } = await new ProcessFactory('git', ['config', '--get', 'remote.origin.url'])
            .cwd(this.directory)
            .stdio({
                stdin: 'ignore',
                stdout: 'pipe',
                stderr: 'ignore'
            })
            .spawn()

        if (error1 !== undefined)
            return {
                error: 'Cannot perform a directory scan, please check if git is correctly installed',
                url: undefined
            }

        const { code, output, error: error2 } = await git.wait({ descriptor: Descriptor.STDOUT })

        if (code !== 0)
            return {
                error: 'The scanned directory is probably not a git repository',
                url: undefined
            }

        if (error2 !== undefined || output === undefined || output === null)
            return {
                error: 'Cannot perform a directory scan',
                url: undefined
            }

        return {
            url: output.toString().trim(),
            error: undefined
        }
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
