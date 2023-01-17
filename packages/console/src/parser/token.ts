/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface OptionToken {
    name: string
    content: string | undefined
}

interface NamedArgumentToken {
    name: string
    content: string | undefined
}

interface AnonymousArgumentToken {
    name: undefined
    content: string | undefined
}

type ArgumentToken = NamedArgumentToken | AnonymousArgumentToken

export type {
    ArgumentToken,
    OptionToken
}
