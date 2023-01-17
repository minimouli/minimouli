/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

enum ResolveStage {
    Loading = 'ResolveStage.Loading',
    ResolvingMoulinette = 'ResolveStage.ResolvingMoulinette',
    ResolvingMoulinetteSource = 'ResolveStage.ResolvingMoulinetteSource',
    Resolved = 'ResolveStage.Resolved',
    Failed = 'ResolveStage.Failed'
}

export {
    ResolveStage
}
