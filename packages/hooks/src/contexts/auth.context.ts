/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Client } from '@minimouli/sdk'
import { createContext } from 'react'
import type { AccountEntity } from '@minimouli/sdk'
import type { LoginWithGitHubDeviceFlowAuth } from '../auth/login-with-github-device-flow.auth.js'
import type { SignupWithGitHubDeviceFlowAuth } from '../auth/signup-with-github-device-flow.auth.js'

interface AuthContextCallableValue {
    loginWithGitHubDeviceFlow: (appName: string) => LoginWithGitHubDeviceFlowAuth
    signupWithGitHubDeviceFlow: (appName: string) => SignupWithGitHubDeviceFlowAuth
    logout: () => void
}

type AuthContextStateValue =
    | {
        loading: true
        client: Client
        user?: undefined
    }
    | {
        loading: false
        client: Client
        user?: undefined
    }
    | {
        loading: false
        client: Client
        user: AccountEntity
    }

type AuthContextValue = AuthContextCallableValue & AuthContextStateValue

const defaultValue: AuthContextValue = {
    loading: true,
    client: new Client(),
    loginWithGitHubDeviceFlow: () => {
        throw new Error('The AuthContext is not yet initialized')
    },
    signupWithGitHubDeviceFlow: () => {
        throw new Error('The AuthContext is not yet initialized')
    },
    logout: () => {}
}

const AuthContext = createContext<AuthContextValue>(defaultValue)

export {
    AuthContext
}
export type {
    AuthContextValue,
    AuthContextCallableValue,
    AuthContextStateValue
}
