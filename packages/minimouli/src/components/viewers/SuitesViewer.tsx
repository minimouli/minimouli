/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TestStatus } from '@minimouli/types/syntheses'
import { Box } from 'ink'
import React from 'react'
import { CascadeSuitesViewer } from './CascadeSuitesViewer.js'
import { TestsSummary } from '../TestsSummary.js'
import { countByStatus, filter } from '../../helpers/suite.helper.js'
import type { SuiteSynthesis } from '@minimouli/types/syntheses'

interface SuitesViewerProps {
    suites: SuiteSynthesis[]
}

const SuitesViewer = ({ suites }: SuitesViewerProps) => {

    const filteredSuites = filter(suites, (test) => test.status === TestStatus.Failure)
    const [passed, failed] = countByStatus(suites)

    return (
        <Box flexDirection="column" >
            <CascadeSuitesViewer suites={filteredSuites} />
            <TestsSummary passed={passed} failed={failed} />
        </Box>
    )
}

export {
    SuitesViewer
}
