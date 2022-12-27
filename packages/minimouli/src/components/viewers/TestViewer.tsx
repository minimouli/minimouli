/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TestStatus } from '@minimouli/types/syntheses'
import { Box, Text } from 'ink'
import React from 'react'
import { HintViewer } from './HintViewer.js'
import type { TestSynthesis } from '@minimouli/types/syntheses'

interface TestViewerProps {
    test: TestSynthesis
}

const TestViewer = ({ test }: TestViewerProps) => (
    <Box marginBottom={1} >
        <Box marginX={1} >
            <Text color={test.status === TestStatus.Success ? 'green' : 'red'} >●</Text>
        </Box>
        <Box flexDirection="column" >
            <Text>{test.name}</Text>
            {test.hint !== undefined && (
                <HintViewer hint={test.hint} />
            )}
        </Box>
    </Box>
)

export {
    TestViewer
}
