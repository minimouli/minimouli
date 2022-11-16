/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Scanner } from '@minimouli/scanner'
import type { Path } from '@minimouli/fs'
import type { ScanResponse } from '@minimouli/scanner'

class ScanService {

    async scan(directory: Path): Promise<ScanResponse> {
        const scanner = new Scanner(directory)
        return scanner.scan()
    }

}

export {
    ScanService
}
