/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Text } from 'ink'
import React, { useEffect, useState } from 'react'

const SpinnerDots = ['⠋', '⠙', '⠸', '⠴', '⠦', '⠇']

interface SpinnerProps {
    frames?: string[]
    interval?: number
}

const Spinner = ({ frames = SpinnerDots, interval = 100 }: SpinnerProps) => {

    const [counter, setCounter] = useState(0)

    useEffect(() => {

        const timer = setInterval(() => {
            setCounter((previous) => previous + 1)
        }, interval)

        return () => clearInterval(timer)
    }, [])

    const indicator = frames.at(counter % frames.length)

    return (
        <Text>{indicator}</Text>
    )
}

export {
    Spinner,
    SpinnerDots
}
