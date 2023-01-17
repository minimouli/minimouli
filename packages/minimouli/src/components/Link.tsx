/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Text } from 'ink'
import React from 'react'

interface LinkProps {
    href: URL | string
}

const Link = ({ href }: LinkProps) => (
    <Text bold underline >{href.toString()}</Text>
)

export {
    Link
}
