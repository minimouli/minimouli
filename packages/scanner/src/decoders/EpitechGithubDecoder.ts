/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Decoder } from './Decoder.js'
import type { ScanResult } from '../ScanResult.js'

class EpitechGithubDecoder implements Decoder {

    private static expression = /(?:git@github\.com:|https:\/\/github\.com\/)[\w-]*epitech[\w-]*\/(?<module>[a-z]-[a-z]{3}-\d{3})-[a-z]+-\d-\d-(?<project>\w+)-[\w-]+\.[\w-]+(?:\.git)?/i

    decode(url: string): ScanResult | undefined {

        const matches = url.match(EpitechGithubDecoder.expression)

        if (matches === null || matches.groups === undefined || matches.input === undefined)
            return undefined

        const { module, project } = matches.groups

        return {
            keywords: {
                school: 'epitech',
                project: project.toLowerCase()
            },
            project: {
                name: project,
                directories: [module],
                organization: 'epitech'
            },
            repository: {
                host: 'github.com',
                url: matches.input
            }
        }
    }

}

export {
    EpitechGithubDecoder
}
