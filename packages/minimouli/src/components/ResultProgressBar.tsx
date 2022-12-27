/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box, Text } from 'ink'
import React from 'react'

interface ResultProgressBar {
    value: number
    width?: number
}

const ResultProgressBar = ({ value, width = 12 }: ResultProgressBar) => {

    const percent = Number.isInteger(value * 100)
        ? (value * 100).toFixed(0)
        : (value * 100).toFixed(1)

    const greenWidth = Math.max(0, Math.round(value * width))
    const redWidth = Math.max(0, width - greenWidth)

    return (
        <Box>
            <Box marginRight={1} >
                <Text color="green" >{'█'.repeat(greenWidth)}</Text>
                <Text color="red" >{'█'.repeat(redWidth)}</Text>
            </Box>
            <Text>{percent}%</Text>
        </Box>
    )
}

export {
    ResultProgressBar
}
