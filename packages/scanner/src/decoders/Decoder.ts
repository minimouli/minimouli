/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ScanResult } from '../ScanResult.js'

interface Decoder {

    decode(url: string): ScanResult | undefined

}

export type {
    Decoder
}
