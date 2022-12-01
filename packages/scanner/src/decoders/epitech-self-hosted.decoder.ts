/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Decoder } from './decoder.js'
import type { ScanResult } from '../types/scan-result.type.js'

class EpitechSelfHostedDecoder implements Decoder {

    private static expression = /git@git\.epitech\.eu:\/[\w-]+\.[\w-]+@epitech\.eu\/(?<module>[a-z]+)_(?<project>[\w-]+)_\d{4}(?:\.git)?/i

    decode(url: string): ScanResult | undefined {

        const matches = url.match(EpitechSelfHostedDecoder.expression)

        if (matches === null || matches.groups === undefined || matches.input === undefined)
            return undefined

        const { module, project } = matches.groups

        return {
            organization: {
                name: 'epitech'
            },
            project: {
                name: project.toLowerCase(),
                directories: [module]
            },
            repository: {
                host: 'git.epitech.eu',
                url: matches.input
            }
        }
    }

}

export {
    EpitechSelfHostedDecoder
}
