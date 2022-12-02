/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box, Text } from 'ink'
import React from 'react'
import type { ReactNode } from 'react'

interface SectionProps {
    title: string
    children: ReactNode
}

const Section = ({ title, children }: SectionProps) => (
    <Box flexDirection="column" >
        <Text bold color="magenta" >══ {title} ══</Text>
        <Box marginTop={1} flexDirection="column" >
            {children}
        </Box>
    </Box>
)

export {
    Section
}
