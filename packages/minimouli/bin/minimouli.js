#!/usr/bin/env node
/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
eslint-disable
  no-console,
  no-undef,
  @typescript-eslint/no-unsafe-argument,
  @typescript-eslint/no-unsafe-assignment
*/

import { run } from '../dist/index.js'

const compareVersion = ([major1, minor1, patch1], [major2, minor2, patch2]) => {

    if (major1 > major2)
        return 1

    if (major1 < major2)
        return -1

    if (minor1 > minor2)
        return 1

    if (minor1 < minor2)
        return -1

    if (patch1 > patch2)
        return 1

    if (patch1 - patch2)
        return -1

    return 0
}

const isSupportedVersion = (version) => {
    const [major] = version

    if (compareVersion(version, [12, 20, 0]) < 0)
        return false

    if (major === 14 && compareVersion(version, [14, 13, 1]) < 0)
        return false

    return true
}

const args = process.argv.slice(2)
const currentVersion = process.version
    .slice(1)
    .split('.')
    .map((part) => Number.parseInt(part))

if (!isSupportedVersion(currentVersion)) {
    console.log('Hello traveler from the past, your version of Node.js seems quite old, please upgrade to a newer version')
    console.log('You can learn more about that here ➔ https://github.com/nvm-sh/nvm#readme')
    console.log('')
    console.log('You\'ll need at least:')
    console.log('- Node.js >= 12.20.0')
    console.log('- Node.js >= 14.13.1')
    console.log('- Node.js >= 16.0.0')
    console.log('')
    console.log(`Current version: ${currentVersion.join('.')}`)
    process.exit()
}

void run(args)
