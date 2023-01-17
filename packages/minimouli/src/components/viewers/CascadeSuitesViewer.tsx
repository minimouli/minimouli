/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box } from 'ink'
import React from 'react'
import { TestGroupViewer } from './TestGroupViewer.js'
import { filter, fromSuites, sort } from '../../helpers/test.helper.js'
import type { SuiteSynthesis } from '@minimouli/types/syntheses'

interface CascadeSuitesViewerProps {
    suites: SuiteSynthesis[]
}

const CascadeSuitesViewer = ({ suites }: CascadeSuitesViewerProps) => {

    const locatedTestGroups = sort(fromSuites(suites))
    const filledLocatedTestGroups = filter(locatedTestGroups, ([, tests]) => tests.length > 0)

    return (
        <Box flexDirection="column" >
            {filledLocatedTestGroups.map((testGroup) => (
                <TestGroupViewer key={(testGroup.at(0) ?? []).join('/')} testGroup={testGroup} />
            ))}
        </Box>
    )
}

export {
    CascadeSuitesViewer
}
