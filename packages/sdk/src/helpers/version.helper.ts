/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Version } from '@minimouli/types'

const fromString = (version: string): Version => {

    const parts = version.split('.')

    if (parts.length !== 3)
        return [Number.NaN, Number.NaN, Number.NaN]

    // @ts-expect-error Parts length was checked before
    return parts.map((part) => Number.parseInt(part))
}

export {
    fromString
}
