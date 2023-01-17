/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { Box, Text } from 'ink'
import React, { useEffect, useState } from 'react'
import { Alert } from './Alert.js'
import { Snippet } from './Snippet.js'
import { Severity } from '../enums/severity.enum.js'
import { compare, toString } from '../helpers/version.helper.js'
import { ConfigService } from '../services/config.service.js'
import { UpgradeCheckService } from '../services/upgrade-check.service.js'
import type { Version } from '@minimouli/types'

const Upgradable = () => {

    const { config } = useInjectable(ConfigService)
    const upgradeCheckService = useInjectable(UpgradeCheckService, {
        createNewInstance: true
    })

    const [latestVersion, setLatestVersion] = useState<Version>([Number.NaN, Number.NaN, Number.NaN])
    const currentVersion = config.app.version

    useEffect(() => {
        void (async () => {
            const version = await upgradeCheckService.getAppLatestVersion()

            if (!version.includes(Number.NaN))
                setLatestVersion(version)
        })()

        return () => upgradeCheckService.abortAllRequests()
    }, [])

    if (compare(currentVersion, latestVersion) >= 0)
        // eslint-disable-next-line unicorn/no-null
        return null

    return (
        <Alert severity={Severity.Warning} >
            <Text>
                <Text>A new update is available: </Text>
                <Text color="red" >{toString(currentVersion)}</Text>
                <Text> ➔ </Text>
                <Text color="green" >{toString(latestVersion)}</Text>
            </Text>
            <Box>
                <Box marginTop={1} marginRight={1} >
                    <Text>Run</Text>
                </Box>
                <Snippet command={`npm i -g ${config.package.name}@${toString(latestVersion)}`} />
                <Box marginTop={1} marginLeft={1} >
                    <Text>to update</Text>
                </Box>
            </Box>
        </Alert>
    )
}

export {
    Upgradable
}
