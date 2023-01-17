/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useAuth } from '@minimouli/hooks'
import React from 'react'
import { Loader } from '../components/Loader.js'
import type { AccountEntity } from '@minimouli/sdk'
import type { With } from '../types/with.type.js'

interface MeWorkflowProps {
    silent: boolean
}

interface MeChildProps {
    user: AccountEntity | undefined
}

type WithMe = With<MeWorkflowProps, MeChildProps>

const withMe: WithMe = (Child) => ({ silent = false }) => {

    const { loading, user } = useAuth()

    if (loading && silent)
        // eslint-disable-next-line unicorn/no-null
        return null

    if (loading && !silent)
        return <Loader message="Loading" />

    return <Child user={user} />
}

export {
    withMe
}
