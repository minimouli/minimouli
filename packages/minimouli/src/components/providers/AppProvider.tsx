/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box } from 'ink'
import React from 'react'
import { CustomAuthProvider } from './CustomAuthProvider.js'
import { ErrorBoundary } from '../ErrorBoundary.js'
import { Header } from '../Header.js'
import { Upgradable } from '../Upgradable.js'
import type { ReactNode } from 'react'

interface AppProviderProps {
    command: string
    children: ReactNode
}

const AppProvider = ({ command, children }: AppProviderProps) => (
    <Box flexDirection="column" >
        <Header command={command} />
        <Upgradable />
        <ErrorBoundary>
            <CustomAuthProvider>
                {children}
            </CustomAuthProvider>
        </ErrorBoundary>
    </Box>
)

export {
    AppProvider
}
