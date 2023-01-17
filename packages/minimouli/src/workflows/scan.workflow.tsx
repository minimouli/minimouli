/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import React, { useEffect, useState } from 'react'
import { ScanService } from '../services/scan.service.js'
import type { Path } from '@minimouli/fs'
import type { ScanResponse, ScanResult } from '@minimouli/scanner'
import type { With } from '../types/with.type.js'

interface ScanWorkflowProps {
    directory: Path
}

type WithScan = With<ScanWorkflowProps, ScanResult>

const withScan: WithScan = (Child) => ({ directory }) => {

    const scanService = useInjectable(ScanService)
    const [response, setResponse] = useState<ScanResponse | undefined>()

    useEffect(() => {
        void (async () => {
            const scanResponse = await scanService.scan(directory)
            setResponse(scanResponse)
        })()
    }, [])

    if (response === undefined)
        // eslint-disable-next-line unicorn/no-null
        return null

    const { result, error } = response

    if (error !== undefined)
        throw new Error(error)

    return <Child {...result} />
}

export {
    withScan
}
