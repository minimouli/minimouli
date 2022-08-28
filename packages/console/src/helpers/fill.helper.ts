/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ArgumentMatch, OptionMatch } from './match.helper.js'

const fillArguments = (argumentMatches: ArgumentMatch[]): void => {

    for (const { argument, token } of argumentMatches) {

        if (token.content === undefined)
            continue

        argument.setContent(token.content)
    }
}

const fillOptions = (optionMatches: OptionMatch[]): void => {

    for (const { option, token } of optionMatches) {

        if (token.content === undefined)
            continue

        option.setContent(token.content)
    }
}

export {
    fillArguments,
    fillOptions
}
