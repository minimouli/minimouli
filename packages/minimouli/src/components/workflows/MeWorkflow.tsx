/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useAuth } from '@minimouli/hooks'
import type { AccountEntity } from '@minimouli/sdk'
import type { Callable } from '@minimouli/types'
import type { ReactElement } from 'react'

interface MeWorkflowProps {
    children: Callable<[AccountEntity], ReactElement>
    loadingFallback?: Callable<[], ReactElement | null>
    notLoggedFallback?: Callable<[], ReactElement | null>
}

const MeWorkflow = ({
    children,
    // eslint-disable-next-line unicorn/no-null
    loadingFallback = () => null,
    // eslint-disable-next-line unicorn/no-null
    notLoggedFallback = () => null
}: MeWorkflowProps) => {

    const { loading, user } = useAuth()

    if (loading)
        return loadingFallback()

    if (user === undefined)
        return notLoggedFallback()

    return children(user)
}

export {
    MeWorkflow
}
