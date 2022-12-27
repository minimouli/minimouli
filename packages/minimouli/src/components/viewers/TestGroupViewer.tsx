/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box, Text } from 'ink'
import React from 'react'
import { TestViewer } from './TestViewer.js'
import type { LocatedTestGroup } from '@minimouli/types/syntheses'

interface TestGroupViewerProps {
    testGroup: LocatedTestGroup
}

const TestGroupViewer = ({ testGroup }: TestGroupViewerProps) => {

    const [path, tests] = testGroup

    return (
        <Box flexDirection="column" >
            <Text>{path.join(' / ')}</Text>
            <Box flexDirection="column" >
                {tests.map((test) => (
                    <TestViewer key={test.name} test={test} />
                ))}
            </Box>
        </Box>
    )
}

export {
    TestGroupViewer
}
