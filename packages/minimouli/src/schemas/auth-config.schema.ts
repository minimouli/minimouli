/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Joi from 'joi'

const authConfigSchema = Joi.object({
    accessToken: Joi.string()
})

export {
    authConfigSchema
}
