/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import child_process from 'node:child_process'
import path from 'node:path'
import { performance } from 'node:perf_hooks'
import url from 'node:url'
import fs from 'node:fs/promises'
import chalk from 'chalk'

class BuildError extends Error {

    constructor(directory) {
        super(`The ${directory} directory cannot be built`)
        this.directory = directory
    }

}

const buildPackage = async (directory) => {

    const sourceDirectory = path.join(directory, 'src')
    const distDirectory = path.join(directory, 'dist')

    return new Promise((resolve, reject) => {

        const babel = child_process.spawn('npx', ['babel', '--extensions', '.ts,.tsx', sourceDirectory, '-d', distDirectory], {
            stdio: 'ignore'
        })

        babel.on('error', () => reject(new BuildError(directory)))

        babel.on('exit', (code) => {
            if (code !== 0)
                reject(new BuildError(directory))
            else
                resolve()
        })
    })
}

const build = async (buildDirectory) => {

    const startTime = performance.now()

    const packages = (await fs.readdir(buildDirectory)).map((directory) => path.join(buildDirectory, directory))
    const builds = await Promise.allSettled(packages.map((directory) => buildPackage(directory)))
    const rejected = builds.filter((build) => build.status === 'rejected')

    const duration = performance.now() - startTime

    if (rejected.length === 0) {
        console.log(`⚡️ Build finished in ${(duration / 1000).toPrecision(3)}s`)
        return
    }

    console.error('Build failed for the following packages:')
    console.error()

    for (const result of rejected)
        console.error(` ${chalk.dim('•')} ${result.reason.directory}`)

    console.error()
    process.exit(1)
}

const currentDirectory = path.dirname(url.fileURLToPath(import.meta.url))
const directory = path.join(currentDirectory, '../packages')

build(directory)
