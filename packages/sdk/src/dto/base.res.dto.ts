/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ErrorResDto } from './error.res.dto.js'
import type { SuccessResDto } from './success.res.dto.js'

type BaseResDto<T> = SuccessResDto<T> | ErrorResDto

export type {
    BaseResDto
}
