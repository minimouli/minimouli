/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import { ErrorOverview } from './ErrorOverview.js'
import type { ReactNode } from 'react'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    error: Error | undefined
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

    public override readonly state: ErrorBoundaryState = {
        error: undefined
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { error }
    }

    override render(): ReactNode {

        if (this.state.error === undefined)
            return this.props.children

        return (
            <ErrorOverview error={this.state.error} />
        )
    }

}

export {
    ErrorBoundary
}
