/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { Box, Text } from 'ink'
import React from 'react'
import { ConfigService } from '../../services/config.service.js'
import type { Command } from '@minimouli/console'

interface CommandViewerProps {
    command: Command
}

const CommandViewer = ({ command }: CommandViewerProps) => {

    const configService = useInjectable(ConfigService)

    return (
        <Box key={command.name} flexDirection="column" marginLeft={2} marginBottom={1} >
            <Text bold >{configService.config.app.cli} {command.name}</Text>
            <Box marginLeft={2} >
                <Text dimColor >{command.shortDescription}</Text>
            </Box>
        </Box>
    )
}

export {
    CommandViewer
}
