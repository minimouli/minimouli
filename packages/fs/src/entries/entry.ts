/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'node:fs'
import type { Path } from '../identifiers/path.identifier.js'

interface AccessSuccessResponse {
    succeed: true
    error: undefined
}

interface AccessFailureResponse {
    succeed: false
    error: string
}

type AccessResponse = AccessSuccessResponse | AccessFailureResponse

abstract class Entry {

    constructor(
        public readonly path: Path
    ) {}

    toString(): string {
        return this.path.toString()
    }

    async access(mode: number): Promise<AccessResponse> {

        return new Promise((resolve) => {

            fs.access(this.path.toString(), mode, (error) => {
                if (error !== null)
                    resolve({ succeed: false, error: error.message })
                else
                    resolve({ succeed: true, error: undefined })
            })
        })
    }

}

export {
    Entry
}
