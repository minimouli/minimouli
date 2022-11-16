/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Text } from 'ink'
import React from 'react'

interface SnippetProps {
    command: string
}

const Snippet = ({ command }: SnippetProps) => (
    <Text color="white" ><Text bold >$</Text> {command}</Text>
)

export {
    Snippet
}
