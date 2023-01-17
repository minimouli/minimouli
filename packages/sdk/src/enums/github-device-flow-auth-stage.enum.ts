/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

enum GitHubDeviceFlowAuthStage {
    Loading = 'GitHubDeviceFlowAuthStage.Loading',
    Polling = 'GitHubDeviceFlowAuthStage.Polling',
    Authorized = 'GitHubDeviceFlowAuthStage.Authorized',
    Succeed = 'GitHubDeviceFlowAuthStage.Succeed',
    Failed = 'GitHubDeviceFlowAuthStage.Failed'
}

export {
    GitHubDeviceFlowAuthStage
}
