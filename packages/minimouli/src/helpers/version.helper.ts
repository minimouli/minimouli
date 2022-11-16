/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Version } from '@minimouli/types'

const compare = ([major1, minor1, patch1]: Version, [major2, minor2, patch2]: Version): number => {

    if (major1 > major2)
        return 1

    if (major1 < major2)
        return -1

    if (minor1 > minor2)
        return 1

    if (minor1 < minor2)
        return -1

    if (patch1 > patch2)
        return 1

    if (patch1 - patch2)
        return -1

    return 0
}

const toString = ([major, minor, patch]: Version): string => `${major}.${minor}.${patch}`

export {
    compare,
    toString
}
