/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Path as ClassicPath } from '@minimouli/fs'
import { config } from '../config.js'

class Path extends ClassicPath {

    static fromProject(path = '.'): Path {
        return Path.fromAbsolute(config.projectPath).join(path)
    }

    static fromMoulinette(path = '.'): Path {
        return Path.fromAbsolute(config.moulinettePath).join(path)
    }

}

export {
    Path
}
