/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Client } from '@minimouli/sdk'
import React, { useEffect, useState } from 'react'
import { LoginWithGitHubDeviceFlowAuth } from '../auth/login-with-github-device-flow.auth.js'
import { SignupWithGitHubDeviceFlowAuth } from '../auth/signup-with-github-device-flow.auth.js'
import { AuthContext } from '../contexts/auth.context.js'
import type { AccountEntity, ClientOptions } from '@minimouli/sdk'
import type { Callable } from '@minimouli/types'
import type { ReactNode } from 'react'
import type { AuthContextStateValue } from '../contexts/auth.context.js'

interface LoginParameters {
    client: Client
    user: AccountEntity
    accessToken: string
}

interface AuthLifeCycle {
    onLogin: Callable<[LoginParameters], boolean | Promise<boolean>>
    onLogout: Callable<[], boolean | Promise<boolean>>
    onAccessTokenRequest: Callable<[], string | undefined | Promise<string | undefined>>
    onError: Callable<[Error]>
}

interface AuthProviderProps extends AuthLifeCycle {
    options?: Partial<ClientOptions>
    children: ReactNode
}

interface UseAuthProviderParameters extends AuthLifeCycle {
    options: Partial<ClientOptions>
}

const useAuthProvider = ({
    onLogin,
    onLogout,
    onAccessTokenRequest,
    onError,
    options
}: UseAuthProviderParameters) => {

    const [stateValue, setStateValue] = useState<AuthContextStateValue>({ loading: true })

    useEffect(() => {
        void (async () => {

            const accessToken = await onAccessTokenRequest()

            if (accessToken === undefined)
                setStateValue({ loading: false })

            try {

                const client = new Client({
                    ...options,
                    accessToken
                })
                const user = await client.accounts.me()

                setStateValue({
                    loading: false,
                    client,
                    user
                })

            } catch (error: unknown) {
                setStateValue({ loading: false })

                if (error instanceof Error)
                    onError(error)
                else
                    onError(new Error('An error occurs during the login'))
            }
        })()
    }, [])

    const handleLogin = ({ client, user, accessToken }: LoginParameters) => {
        void (async () => {

            const isLoggedIn = await onLogin({ client, user, accessToken })

            if (isLoggedIn)
                setStateValue({
                    loading: false,
                    client,
                    user
                })
        })()
    }

    const loginWithGitHubDeviceFlow = (appName: string) => {

        const auth = new LoginWithGitHubDeviceFlowAuth(appName, options)

        auth.on('succeed', handleLogin)
        auth.on('error', () => {})

        return auth
    }

    const signupWithGitHubDeviceFlow = (appName: string) => {

        const auth = new SignupWithGitHubDeviceFlowAuth(appName, options)

        auth.on('succeed', handleLogin)
        auth.on('error', () => {})

        return auth
    }

    const logout = () => {
        void (async () => {

            const isLoggedOut = await onLogout()

            if (isLoggedOut)
                setStateValue({ loading: false })
        })()
    }

    return ({
        ...stateValue,
        loginWithGitHubDeviceFlow,
        signupWithGitHubDeviceFlow,
        logout
    })
}

const AuthProvider = ({
    onLogin,
    onLogout,
    onAccessTokenRequest,
    onError,
    options = {},
    children
}: AuthProviderProps) => {

    const value = useAuthProvider({
        onLogin,
        onLogout,
        onAccessTokenRequest,
        onError,
        options
    })

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}
