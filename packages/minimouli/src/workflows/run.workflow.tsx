/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Runner } from '@minimouli/runner'
import React, { useEffect, useState } from 'react'
import { ProgressBar } from '../components/ProgressBar.js'
import { countTotalTests } from '../helpers/suite.helper.js'
import type { Path } from '@minimouli/fs'
import type { SuiteSynthesis } from '@minimouli/types/syntheses'
import type { With } from '../types/with.type.js'

interface RunWorkflowProps {
    projectPath: Path
    moulinettePath: Path
}

interface RunChildProps {
    suites: SuiteSynthesis[]
}

type WithRun = With<RunWorkflowProps, RunChildProps>

const withRun: WithRun = (Child) => ({
    projectPath,
    moulinettePath
}) => {

    const [message, setMessage] = useState('')
    const [value, setValue] = useState(0)
    const [result, setResult] = useState<SuiteSynthesis[] | undefined>()

    const handleTestLaunched = (name: string, path: string[], currentValue: number) => {
        setMessage([...path, name].join(' / '))
        setValue(currentValue)
    }

    useEffect(() => {

        const runner = new Runner(projectPath, moulinettePath)

        void (async () => {

            const { error: error1 } = await runner.prepare()
            if (error1 !== undefined)
                throw new Error(error1)

            const { error: error2, syntheses: plan } = await runner.plan()
            if (error2 !== undefined)
                throw new Error(error2)

            const availableTestsCounter = countTotalTests(plan)
            let launchedTestCounter = 0

            runner.on('test:launched', ({ name, path }) => {
                handleTestLaunched(name, path, launchedTestCounter / availableTestsCounter)
                launchedTestCounter++
            })

            const { error: error3, syntheses } = await runner.run()
            if (error3 !== undefined)
                throw new Error(error3)

            runner.terminate()
            setResult(syntheses)

        })()

        return () => runner.terminate()
    }, [])

    if (result === undefined)
        return <ProgressBar message={message} value={value} />

    return <Child suites={result} />
}

export {
    withRun
}
