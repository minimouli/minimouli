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

                information: Joi.object()
                    .keys({
                        projectName: Joi.string().required(),

                        projectCycle: Joi.number()
                            .integer()
                            .required(),

                        organizationName: Joi.string().required()
                    })
                    .required()
            })
        )
        .required()
})

export {
    registrySchema
}
