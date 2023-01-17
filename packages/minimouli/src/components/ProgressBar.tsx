/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box, measureElement, Text, Transform } from 'ink'
import React, { useEffect, useRef, useState } from 'react'
import { applyInverseTransformation, createProgressBarContent } from '../helpers/progress.helper.js'
import { format } from '../helpers/timer.helper.js'
import type { DOMElement } from 'ink'

interface ProgressBarProps {
    message: string
    value: number
}

const ProgressBar = ({ message, value }: ProgressBarProps) => {

    const containerRef = useRef<DOMElement | null>(null)

    const [duration, setDuration] = useState(0)
    const [width, setWidth] = useState(0)

    useEffect(() => {

        const timer = setInterval(() => {
            setDuration((previous) => previous + 1)
        }, 100)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {

        if (containerRef.current === null)
            return

        const { width: currentWidth } = measureElement(containerRef.current)
        setWidth(currentWidth)

    }, [duration])

    return (
        <Box ref={containerRef} width="100%" >
            <Transform transform={(content) => applyInverseTransformation(content, value)} >
                <Text>{createProgressBarContent(message, format(duration * 100), width)}</Text>
            </Transform>
        </Box>
    )
}

export {
    ProgressBar
}
