/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Path } from '@minimouli/fs'
import type { MoulinetteEntity, MoulinetteSourceEntity } from '@minimouli/sdk'
import type { InstallStage } from '../../enums/install-stage.enum.js'

type InstallServiceResponse =
    | [InstallStage.Loading, Record<string, never>]
    | [InstallStage.Downloading, {
        loaded: number
        completed: number | undefined
        total: number | undefined
    }]
    | [InstallStage.Installing, Record<string, never>]
    | [InstallStage.Installed, {
        moulinette: MoulinetteEntity
        moulinetteSource: MoulinetteSourceEntity
        moulinettePath: Path
    }]
    | [InstallStage.Failed, { error: string }]

export type {
    InstallServiceResponse
}
