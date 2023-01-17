/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { PagingResult } from '../paging-result.js'

async function* iteratePagingResult<Dto, Entity>(pagingResult: PagingResult<Dto, Entity>) {

    let page = pagingResult
    yield* page.items

    while (page.hasNext()) {
        // eslint-disable-next-line no-await-in-loop
        page = await page.next()
        yield* page.items
    }
}

export {
    iteratePagingResult
}
