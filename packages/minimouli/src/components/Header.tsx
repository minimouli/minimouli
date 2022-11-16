/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useInjectable } from '@minimouli/console'
import { Text } from 'ink'
import React from 'react'
import { toString } from '../helpers/version.helper.js'
import { ConfigService } from '../services/config.service.js'

interface HeaderProps {
    command: string
}

const Header = ({ command }: HeaderProps) => {

    const { config } = useInjectable(ConfigService)

    const name = config.app.name
    const version = toString(config.app.version)

    return (
        <Text bold >{name} {command} {version}</Text>
    )
}

export {
    Header
}
