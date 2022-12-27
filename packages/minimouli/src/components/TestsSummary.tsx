/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box, Text } from 'ink'
import React from 'react'
import { ResultProgressBar } from './ResultProgressBar.js'

interface TestsSummaryProps {
    passed: number
    failed: number
}

const TestsSummary = ({ passed, failed }: TestsSummaryProps) => {

    const value = passed + failed > 0
        ? passed / (passed + failed)
        : 0

    return (
        <Box flexDirection="column" >
            <Text>Tests summary</Text>
            <Text>
                <Text color="green" > ✓ </Text>
                <Text dimColor >{passed} test{passed !== 0 && 's'} passed</Text>
            </Text>
            <Text>
                <Text color="red" > ✕ </Text>
                <Text dimColor >{failed} test{failed !== 0 && 's'} failed</Text>
            </Text>
            <Box marginLeft={3} >
                <ResultProgressBar value={value} />
            </Box>
        </Box>
    )
}

export {
    TestsSummary
}
