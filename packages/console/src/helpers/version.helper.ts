/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Version } from '@minimouli/types'

const fromStrings = (major: string, minor: string, patch: string): Version => {

    const version = [major, minor, patch].map((part) => Number.parseInt(part))

    if (version.includes(Number.NaN))
        return [Number.NaN, Number.NaN, Number.NaN]

    // @ts-expect-error The length is known
    return version
}

export {
    fromStrings
}
