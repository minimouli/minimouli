/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { Box, Text } from 'ink'
import React from 'react'
import { compare, toString } from '../helpers/version.helper.js'
import { ConfigService } from '../services/config.service.js'
import type { Version } from '@minimouli/types'

const Upgradable = () => {

    const { config } = useInjectable(ConfigService)
    const currentVersion = config.app.version
    const latestVersion: Version = [2, 0, 0]

    if (compare(currentVersion, latestVersion) >= 0)
        // eslint-disable-next-line unicorn/no-null
        return null

    return (
        <Box>
            <Box paddingX={1} borderStyle="round" flexDirection="column" >
                <Text>A new update is available: <Text color="red" >{toString(currentVersion)}</Text> ➔ <Text color="green" >{toString(latestVersion)}</Text></Text>
                <Text>Run <Text color="blue" >npm i -g minimouli@{toString(latestVersion)}</Text> to update.</Text>
            </Box>
        </Box>
    )
}

export {
    Upgradable
}
