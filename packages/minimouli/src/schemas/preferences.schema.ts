/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Joi from 'joi'

const preferencesSchema = Joi.object({
    api: Joi.object()
        .keys({
            baseUrl: Joi.string()
                .uri({
                    scheme: ['http', 'https']
                })
        })
})

export {
    preferencesSchema
}
