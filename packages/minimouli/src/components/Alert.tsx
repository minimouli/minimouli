/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box } from 'ink'
import React from 'react'
import { Severity } from '../enums/severity.enum.js'
import type { ReactNode } from 'react'

interface AlertProps {
    severity?: Severity
    children: ReactNode
}

const SeverityColorMap = {
    [Severity.Success]: 'white',
    [Severity.Info]: 'white',
    [Severity.Warning]: 'yellow',
    [Severity.Error]: 'red'
}

const Alert = ({ children, severity = Severity.Info }: AlertProps) => (
    <Box>
        <Box paddingX={1} borderStyle="double" borderColor={SeverityColorMap[severity]} flexDirection="column" >
            {children}
        </Box>
    </Box>
)

export {
    Alert
}
