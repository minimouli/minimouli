/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

enum Stage {
    Loading = 'Stage.Loading',
    ResolvingMoulinette = 'Stage.ResolvingMoulinette',
    ResolvingMoulinetteSource = 'Stage.ResolvingMoulinetteSource',
    Downloading = 'Stage.Downloading',
    Installing = 'Stage.Installing',
    Installed = 'Stage.Installed',
    Failed = 'Stage.Failed'
}

export {
    Stage
}
