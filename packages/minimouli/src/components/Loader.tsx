/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Text } from 'ink'
import React from 'react'
import { Spinner } from './Spinner.js'
import type { ReactNode } from 'react'

interface LoaderProps {
    message: ReactNode
}

const Loader = ({ message }: LoaderProps) => (
    <Text> <Spinner /> {message}</Text>
)

export {
    Loader
}
