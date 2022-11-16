/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, useContext } from 'react'

interface StdioContextProps {
    stdin: NodeJS.ReadStream
    stdout: NodeJS.WriteStream
    stderr: NodeJS.WriteStream
}

const StdioContext = createContext<StdioContextProps>({
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr
})

const useStdio = () => useContext(StdioContext)

export {
    useStdio
}
