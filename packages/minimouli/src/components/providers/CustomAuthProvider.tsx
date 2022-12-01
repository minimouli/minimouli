/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { AuthProvider } from '@minimouli/hooks'
import { isMinimouliClientError } from '@minimouli/sdk'
import React from 'react'
import { AuthConfigService } from '../../services/auth-config.service.js'
import type { ReactNode } from 'react'

interface CustomAuthProviderProps {
    children: ReactNode
}

const CustomAuthProvider = ({ children }: CustomAuthProviderProps) => {

    const authConfigService = useInjectable(AuthConfigService)

    const handleLogin = async ({ accessToken }: { accessToken: string }) => {

        authConfigService.data = {
            accessToken
        }

        await authConfigService.save()
        return true
    }

    const handleLogout = async () => {
        authConfigService.data = {}
        await authConfigService.save()
        return true
    }

    const handleAccessTokenRequest = () => {

        if (authConfigService.data === null)
            return

        return authConfigService.data.accessToken
    }

    const handleError = (error: Error) => {
        if (isMinimouliClientError(error) && error.statusCode === 401) {
            authConfigService.data = {}
            void authConfigService.save()
        }
    }

    return (
        <AuthProvider
            onLogin={handleLogin}
            onLogout={handleLogout}
            onAccessTokenRequest={handleAccessTokenRequest}
            onError={handleError}
        >
            {children}
        </AuthProvider>
    )
}

export {
    CustomAuthProvider
}
