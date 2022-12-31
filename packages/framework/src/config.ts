/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { FrameworkConfig } from '@minimouli/types/config'

// eslint-disable-next-line import/no-mutable-exports
let config: FrameworkConfig = {
    projectPath: '.',
    moulinettePath: '.',
    binaries: {}
}

const setConfig = (config_: FrameworkConfig) => {
    config = config_
}

export {
    config,
    setConfig
}
