/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import ErrorStackParser from 'error-stack-parser'
import { Box, Text } from 'ink'
import React from 'react'
import { Link } from './Link.js'
import { ConfigService } from '../services/config.service.js'

interface ErrorOverviewProps {
    error: Error | string
}

const ErrorOverview = ({ error }: ErrorOverviewProps) => {

    const { config } = useInjectable(ConfigService)
    const isErrorObject = error instanceof Error

    const message = isErrorObject ? error.message : error
    const stackFrames = isErrorObject ? ErrorStackParser.parse(error) : []

    return (
        <Box flexDirection="column" >
            <Box marginTop={1} >
                <Text><Text backgroundColor="red" > ERROR </Text> {message}</Text>
            </Box>

            {isErrorObject && (
                <Box flexDirection="column" >
                    {stackFrames.length > 1 && (
                        <Box marginBottom={1} >
                            <Text color="gray" >{stackFrames[0].fileName}:{stackFrames[0].lineNumber}:{stackFrames[0].columnNumber}</Text>
                        </Box>
                    )}
                    <Box flexDirection="column" >
                        {stackFrames.map((stackFrame, index) => (
                            <Text key={index} color="gray" >
                                <Text bold >- {stackFrame.functionName}</Text>
                                {' '}
                                <Text dimColor >({stackFrame.fileName}:{stackFrame.lineNumber}:{stackFrame.columnNumber})</Text>
                            </Text>
                        ))}
                    </Box>
                </Box>
            )}

            <Box marginTop={1} >
                <Text>
                    If you think this is a {config.app.name} problem, please open a report at <Link href={config.app.links.issues} />
                </Text>
            </Box>
        </Box>
    )
}

export {
    ErrorOverview
}
