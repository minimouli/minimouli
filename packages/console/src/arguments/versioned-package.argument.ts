/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Argument } from './argument.js'
import { fromStrings } from '../helpers/version.helper.js'
import type { Version } from '@minimouli/types'

interface VersionedPackage {
    name: string
    version: Version
}

class VersionedPackageArgument extends Argument<VersionedPackage> {

    private static expression = /^(?<name>\w+)@(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/i

    get content(): VersionedPackage {

        if (this.internalContent === undefined)
            return { name: '', version: [Number.NaN, Number.NaN, Number.NaN] }

        if (typeof this.internalContent === 'object')
            return this.internalContent

        const matches = this.internalContent.match(VersionedPackageArgument.expression)

        if (matches === null || matches.groups === undefined)
            return { name: '', version: [Number.NaN, Number.NaN, Number.NaN] }

        const { name, major, minor, patch } = matches.groups
        const version = fromStrings(major, minor, patch)

        return { name, version }
    }

    override validate(content: string | undefined): boolean {

        if (!super.validate(content))
            return false

        if (content === undefined)
            return true

        const matches = content.match(VersionedPackageArgument.expression)
        return matches !== null
    }

}

export {
    VersionedPackageArgument
}
