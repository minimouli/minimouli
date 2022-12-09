/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Joi from 'joi'

const registrySchema = Joi.object({
    moulinettes: Joi.array()
        .items(
            Joi.object().keys({
                id: Joi.string().required(),

                version: Joi.array()
                    .items(Joi.number())
                    .length(3)
                    .required(),

                path: Joi.string().required(),

                rules: Joi.array()
                    .items(Joi.string())
                    .required(),

                checksum: Joi.string()
                    .required(),

                information: Joi.object()
                    .keys({
                        organization: Joi.object()
                            .keys({
                                name: Joi.string().required()
                            })
                            .required(),

                        project: Joi.object()
                            .keys({
                                name: Joi.string().required(),

                                cycle: Joi.number()
                                    .integer()
                                    .required()
                            })
                            .required()
                    })
                    .required(),

                installedAt: Joi.string()
                    .isoDate()
                    .required()
            })
        )
        .required()
})

export {
    registrySchema
}
