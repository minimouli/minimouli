/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Command } from '@minimouli/console'
import React from 'react'
import { AppProvider } from '../components/providers/AppProvider.js'
import { withLogout } from '../workflows/logout.workflow.js'
import type { ReactNode } from 'react'

class LogoutCommand extends Command {

    public readonly name = 'logout'

    public readonly description = ['Logout from this device.']
    public readonly shortDescription = 'Logout from this device'

    execute(): ReactNode {

        const LogoutWorkflow = withLogout()

        return (
            <AppProvider command={this.name} >
                <LogoutWorkflow />
            </AppProvider>
        )
    }

}

export {
    LogoutCommand
}
