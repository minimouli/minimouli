/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Joi from 'joi'

const configSchema = Joi.object({
    rootDir: Joi.string().required(),

    binaries: Joi.object()
        .pattern(Joi.string(), Joi.string())
        .required(),

    suites: Joi.object()
        .keys({
            default: Joi.array()
                .items(Joi.string())
                .required()
        })
        .pattern(Joi.string(), Joi.array().items(Joi.string()))
        .required()
})

export {
    configSchema
}
