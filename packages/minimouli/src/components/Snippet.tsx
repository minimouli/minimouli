/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box, Text } from 'ink'
import React from 'react'

interface SnippetProps {
    command: string
}

const Snippet = ({ command }: SnippetProps) => {

    const width = command.length + 4

    return (
        <Box flexDirection="column">
            <Text dimColor >╭{'─'.repeat(width - 2)}╮</Text>
            <Box>
                <Text bold dimColor >$</Text>
                <Box paddingX={1}>
                    <Text>{command}</Text>
                </Box>
                <Text dimColor >│</Text>
            </Box>
            <Text dimColor >╰{'─'.repeat(width - 2)}╯</Text>
        </Box>
    )
}

export {
    Snippet
}
