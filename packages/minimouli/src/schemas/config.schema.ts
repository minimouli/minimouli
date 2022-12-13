/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Joi from 'joi'

const configSchema = Joi.object({
    app: Joi.object()
        .keys({
            name: Joi.string().required(),
            cli: Joi.string().required(),

            version: Joi.array()
                .items(Joi.number())
                .length(3)
                .required(),

            links: Joi.object()
                .keys({
                    website: Joi.string()
                        .uri({
                            scheme: ['http', 'https']
                        })
                        .required(),

                    repository: Joi.object()
                        .keys({
                            organization: Joi.string()
                                .uri({
                                    scheme: ['http', 'https']
                                })
                                .required(),

                            project: Joi.string()
                                .uri({
                                    scheme: ['http', 'https', 'git']
                                })
                                .required()
                        })
                        .required(),

                    issues: Joi.string()
                        .uri({
                            scheme: ['http', 'https']
                        })
                        .required()
                })
                .required()
        })
        .required(),

    api: Joi.object()
        .keys({
            baseUrl: Joi.string()
                .uri({
                    scheme: ['http', 'https']
                })
                .required()
        })
        .required(),

    package: Joi.object()
        .keys({
            name: Joi.string().required()
        })
        .required()
})

export {
    configSchema
}
