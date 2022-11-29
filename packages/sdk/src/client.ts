/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpClient } from './http-client.js'
import type { ClientOptions } from './types/options/client.options.type.js'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class Client {

    constructor(options: Partial<ClientOptions>) {

        const httpClient = new HttpClient(
            options.accessToken,
            options.baseUrl ?? 'https://api.minimouli.com'
        )

        void httpClient
    }

}

export {
    Client
}
