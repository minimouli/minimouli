/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Path } from '../identifiers/Path.js'

abstract class Entry {

    constructor(
        public readonly path: Path
    ) {}

    toString(): string {
        return this.path.toString()
    }

}

export {
    Entry
}
