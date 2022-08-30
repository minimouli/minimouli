/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const buildConfig = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: 'node 12.20.0',
                useBuiltIns: 'usage',
                corejs: '3.25',
                modules: false
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    ignore: [
        '**/__tests__'
    ]
}

const testConfig = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ]
}

const config = process.env.NODE_ENV === 'test'
    ? testConfig
    : buildConfig

module.exports = config
