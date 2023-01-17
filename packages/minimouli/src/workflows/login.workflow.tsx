/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { useAuth } from '@minimouli/hooks'
import { GitHubDeviceFlowAuthStage } from '@minimouli/sdk'
import { Box, Text } from 'ink'
import React, { useEffect, useState } from 'react'
import { ErrorOverview } from '../components/ErrorOverview.js'
import { Link } from '../components/Link.js'
import { Loader } from '../components/Loader.js'
import { Snippet } from '../components/Snippet.js'
import { ConfigService } from '../services/config.service.js'
import type { GitHubDeviceFlowAuthResponse } from '@minimouli/sdk'
import type { CompletedWith } from '../types/with.type.js'

type LoginWorkflowProps = Record<string, never>
type WithLogin = CompletedWith<LoginWorkflowProps>

const withLogin: WithLogin = () => () => {

    const { config } = useInjectable(ConfigService)
    const { signupWithGitHubDeviceFlow } = useAuth()
    const [signupResponse, setSignupResponse] = useState<GitHubDeviceFlowAuthResponse>([GitHubDeviceFlowAuthStage.Loading, {}])
    const [stage, data] = signupResponse

    useEffect(() => {

        const auth = signupWithGitHubDeviceFlow(`${config.app.name} CLI`)
            .on('change', (response: GitHubDeviceFlowAuthResponse) => setSignupResponse(response))
            .signup()

        return () => auth.abortAllRequests()
    }, [])

    return (
        <Box>
            {stage === GitHubDeviceFlowAuthStage.Polling && (
                <Box flexDirection="column" >
                    <Loader message={`Congratulations, you are about to upgrade your ${config.app.name} experience to use it at full power`} />

                    <Box marginTop={1} flexDirection="column" >
                        <Text>To authenticate yourself, we invite you to login with your GitHub account</Text>

                        <Box marginTop={1} flexDirection="column" >
                            <Text>1. Open the login page in your favorite browser ➔ <Link href={data.verificationUri} /></Text>
                            <Text>2. Enter the following code ➔ <Text bold >{data.userCode}</Text></Text>
                            <Text>3. That's all, we take care of the rest!</Text>
                        </Box>
                    </Box>

                    <Box marginTop={1} flexDirection="column" >
                        <Text italic >Psst, psst, we don't do evil things, we only use this method to prevent bots</Text>
                        <Text italic >The entire {config.app.name} project is open source, feel free to check and contribute at <Link href={config.app.links.repository.organization} /></Text>
                    </Box>
                </Box>
            )}

            {stage === GitHubDeviceFlowAuthStage.Authorized && (
                <Loader message="Your are about to be logged" />
            )}

            {stage === GitHubDeviceFlowAuthStage.Succeed && (
                <Box flexDirection="column" >
                    <Text>Welcome to {config.app.name} {data.user.nickname}!</Text>

                    <Box marginTop={1} flexDirection="column" >
                        <Text>You now have access to our amazing website and more</Text>
                        <Text>To get started, run the following command in one of your project directories:</Text>
                        <Snippet command={`${config.app.cli} run`} />
                    </Box>
                </Box>
            )}

            {stage === GitHubDeviceFlowAuthStage.Failed && (
                <ErrorOverview error={data.error} />
            )}
        </Box>
    )
}

export {
    withLogin
}
