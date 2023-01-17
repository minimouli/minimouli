/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface PagingResultResDto<T> {
    object: 'list'
    items: T[]
    beforeCursor: string | null
    afterCursor: string | null
}

export type {
    PagingResultResDto
}
