/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { useEffect, useState } from 'react'
import { ScanService } from '../../services/scan.service.js'
import type { Path } from '@minimouli/fs'
import type { ScanResponse, ScanResult } from '@minimouli/scanner'
import type { Callable } from '@minimouli/types'
import type { ReactElement } from 'react'

interface ScanWorkflowProps {
    directory: Path
    children: Callable<[ScanResult], ReactElement>
}

const ScanWorkflow = ({ directory, children }: ScanWorkflowProps) => {

    const scanService = useInjectable(ScanService)

    const [result, setResult] = useState<ScanResponse>()

    useEffect(() => {

        const run = async () => {
            const response = await scanService.scan(directory)
            setResult(response)
        }

        void run()
    }, [])

    if (result === undefined)
        // eslint-disable-next-line unicorn/no-null
        return null

    const { result: scanResult, error } = result

    if (error !== undefined)
        throw new Error(error)

    return children(scanResult)
}

export {
    ScanWorkflow
}
