/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Command } from '@minimouli/console'
import React from 'react'
import { AppProvider } from '../components/providers/AppProvider.js'
import { withLogin } from '../workflows/login.workflow.js'
import type { ReactElement } from 'react'

class LoginCommand extends Command {

    public readonly name = 'login'

    public readonly description = [
        'Authenticate yourself with a GitHub account.',
        'If a minimouli account is not yet associated with the GitHub account, it will be created.'
    ]
    public readonly shortDescription = 'Authenticate yourself with a GitHub account'

    execute(): ReactElement {

        const LoginWorkflow = withLogin()

        return (
            <AppProvider command={this.name} >
                <LoginWorkflow />
            </AppProvider>
        )
    }

}

export {
    LoginCommand
}
