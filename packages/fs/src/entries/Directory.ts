/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'node:fs'
import { Entry } from './Entry.js'
import type { MakeDirectoryOptions } from 'node:fs'

interface MkdirSuccessResponse {
    succeed: true
    error: undefined
}

interface MkdirFailureResponse {
    succeed: false
    error: string
}

type MkdirResponse = MkdirSuccessResponse | MkdirFailureResponse

class Directory extends Entry {

    async mkdir(options: Partial<MakeDirectoryOptions> = {}): Promise<MkdirResponse> {

        return new Promise((resolve) => {

            fs.mkdir(this.path.toString(), options, (error) => {

                if (error)
                    resolve({ error: error.message, succeed: false })
                else
                    resolve({ succeed: true, error: undefined })
            })
        })
    }

}

export {
    Directory
}
