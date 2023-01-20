/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import os from 'node:os'
import glob from 'fast-glob'
import { randomString } from '../helpers/random.helper.js'

class Path {

    protected entries: string[]

    protected constructor(entries: string[]) {

        const stack: string[] = []

        for (const entry of entries)
            if (entry === '..')
                stack.pop()
            else if (entry.length > 0 && entry !== '.')
                stack.push(entry)

        this.entries = stack
    }

    static fromRelative(base: Path, segments: string): Path {

        const entries = [
            ...base.entries,
            ...segments.split('/')
        ]

        return new Path(entries)
    }

    static fromAbsolute(path: string): Path {

        const entries = path.split('/')

        return new Path(entries)
    }

    static current(): Path {
        return Path.fromAbsolute(process.cwd())
    }

    static home(): Path {
        return Path.fromAbsolute(os.homedir())
    }

    static tmp(): Path {
        return Path.fromAbsolute(os.tmpdir()).join('minimouli')
    }

    static app(): Path {
        return Path.home().join('.minimouli')
    }

    join(segments: string): Path {
        return Path.fromRelative(this, segments)
    }

    async glob(segments: string): Promise<Path[]> {

        const entries = await glob(segments, {
            dot: true,
            cwd: this.toString()
        })

        return entries.map((entry) => this.join(entry))
    }

    random(length = 16): Path {
        return this.join(randomString(length))
    }

    toString(): string {
        return `/${this.entries.join('/')}`
    }

}

export {
    Path
}
