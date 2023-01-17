/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EOL } from 'node:os'
import { useStdio } from '@minimouli/console'
import { useEffect } from 'react'

interface JsonPrinterProps {
    content: object
    minified?: boolean
}

const JsonPrinter = ({ content, minified = false }: JsonPrinterProps) => {

    const { stdout } = useStdio()
    const formattedContent = JSON.stringify(content, undefined, minified ? 0 : 2)

    useEffect(() => {
        stdout.write(formattedContent)
        stdout.write(EOL)
    }, [])

    // eslint-disable-next-line unicorn/no-null
    return null
}

export {
    JsonPrinter
}
