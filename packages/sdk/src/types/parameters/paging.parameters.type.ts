/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface PagingParameters {
    limit: number
    beforeCursor: string
    afterCursor: string
}

export type {
    PagingParameters
}
