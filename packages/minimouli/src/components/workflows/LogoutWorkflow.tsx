/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { useAuth } from '@minimouli/hooks'
import { Box, Text } from 'ink'
import React, { useEffect } from 'react'
import { Loader } from '../Loader.js'
import { Snippet } from '../Snippet.js'
import { ConfigService } from '../../services/config.service.js'

const LogoutWorkflow = () => {

    const { loading, user, logout } = useAuth()
    const { config } = useInjectable(ConfigService)

    useEffect(() => {
        if (!loading)
            logout()
    }, [loading])

    if (loading)
        return <Loader message="Loading" />

    if (user !== undefined)
        return <Loader message="You will be logged out" />

    return (
        <Box flexDirection="column" >
            <Text>You are now logged out</Text>

            <Box marginTop={1} flexDirection="column" >
                <Text>To login again, run the following command:</Text>
                <Snippet command={`${config.app.cli} login`} />
            </Box>
        </Box>
    )
}

export {
    LogoutWorkflow
}
