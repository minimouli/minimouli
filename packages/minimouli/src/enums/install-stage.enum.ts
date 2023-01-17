/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

enum InstallStage {
    Loading = 'InstallStage.Loading',
    Downloading = 'InstallStage.Downloading',
    Installing = 'InstallStage.Installing',
    Installed = 'InstallStage.Installed',
    Failed = 'InstallStage.Failed'
}

export {
    InstallStage
}
