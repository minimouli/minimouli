/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { useAuth } from '@minimouli/hooks'
import { isMinimouliClientError } from '@minimouli/sdk'
import { Box, Text } from 'ink'
import React, { useEffect, useState } from 'react'
import { Alert } from './Alert.js'
import { Link } from './Link.js'
import { Loader } from './Loader.js'
import { Snippet } from './Snippet.js'
import { Severity } from '../enums/severity.enum.js'
import { ConfigService } from '../services/config.service.js'
import type { RunEntity } from '@minimouli/sdk'
import type { SuiteSynthesis } from '@minimouli/types/syntheses'

interface UploadProps {
    suites: SuiteSynthesis[]
    moulinette: string
}

const Upload = ({ suites, moulinette }: UploadProps) => {

    const { loading, user, client } = useAuth()
    const { config } = useInjectable(ConfigService)

    const [run, setRun] = useState<RunEntity | undefined>()
    const [error, setError] = useState<string | undefined>()

    useEffect(() => {

        if (loading)
            return

        if (user === undefined)
            return

        void (async () => {
            try {
                const savedRun = await client.runs.post(suites, moulinette)
                setRun(savedRun)
            } catch (error_: unknown) {

                if (isMinimouliClientError(error_)) {
                    setError(`Unable to upload the run (status: ${error_.statusCode})`)
                    return
                }

                setError('Unable to upload the run')
            }
        })()

        return () => client.abortAllRequests()
    }, [loading, user])

    if (error !== undefined)
        return (
            <Alert severity={Severity.Error} >
                <Text>{error}</Text>
            </Alert>
        )

    if (!loading && user === undefined)
        return (
            <Alert severity={Severity.Warning} >
                <Text>Your work cannot be saved online</Text>
                <Box>
                    <Box marginTop={1} marginRight={1} >
                        <Text>Run</Text>
                    </Box>
                    <Snippet command={`${config.app.cli} login`} />
                    <Box marginTop={1} marginLeft={1} >
                        <Text>to start</Text>
                    </Box>
                </Box>
            </Alert>
        )

    if (run === undefined)
        return <Loader message="Uploading" />

    const runLink = config.website.run.replaceAll('${runId}', run.id)
    return <Text>An advanced moulinette result is available at <Link href={runLink} /></Text>
}

export {
    Upload
}
