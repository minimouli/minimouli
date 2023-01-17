/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Argument } from '../arguments/argument.js'
import type { ArgumentToken, OptionToken } from '../parser/token.js'

interface ArgumentMatch {
    argument: Argument<unknown>
    token: ArgumentToken
}

interface OptionMatch {
    option: Argument<unknown>
    token: OptionToken
}

interface SeparateTokens {
    namedTokens: ArgumentToken[]
    anonymousTokens: ArgumentToken[]
}

const separateTokens = (tokens: ArgumentToken[]): SeparateTokens => {

    const namedTokens = []
    const anonymousTokens = []

    for (const token of tokens)
        if (token.name !== undefined)
            namedTokens.push(token)
        else
            anonymousTokens.push(token)

    return {
        namedTokens,
        anonymousTokens
    }
}

const matchNamedArguments = (args: Argument<unknown>[], tokens: ArgumentToken[]): ArgumentMatch[] | undefined => {

    const argumentMatches: ArgumentMatch[] = []

    for (const token of tokens) {

        const { name, content } = token
        const foundArgument = args.find((argument) => argument.name === name)

        // Continue to skip when the argument is unknown
        if (!foundArgument)
            continue

        if (!foundArgument.validate(content))
            return undefined

        argumentMatches.push({
            argument: foundArgument,
            token
        })
    }

    return argumentMatches
}

const matchAnonymousArguments = (args: Argument<unknown>[], tokens: ArgumentToken[]): ArgumentMatch[] | undefined => {

    const argumentMatches: ArgumentMatch[] = []

    for (const argument of args) {

        const token = tokens.shift() ?? { name: undefined, content: undefined }

        if (!argument.validate(token.content))
            return undefined

        argumentMatches.push({
            argument,
            token
        })
    }

    return argumentMatches
}

const matchArguments = (args: Argument<unknown>[], tokens: ArgumentToken[]): ArgumentMatch[] | undefined => {

    const {
        namedTokens,
        anonymousTokens
    } = separateTokens(tokens)

    const namedArgumentMatches = matchNamedArguments(args, namedTokens)

    if (!namedArgumentMatches)
        return undefined

    // Remove the used arguments to continue with the remaining arguments only
    const usedArguments = new Set(namedArgumentMatches.map((namedArgumentMatch) => namedArgumentMatch.argument))
    const remainingArguments = args.filter((argument) => !usedArguments.has(argument))

    const anonymousArgumentMatches = matchAnonymousArguments(remainingArguments, anonymousTokens)

    if (!anonymousArgumentMatches)
        return undefined

    return [
        ...namedArgumentMatches,
        ...anonymousArgumentMatches
    ]
}

const matchOptions = (options: Argument<unknown>[], tokens: OptionToken[]): OptionMatch[] | undefined => {

    const optionMatches: OptionMatch[] = []

    for (const option of options) {

        const name = option.name
        const foundToken = tokens.find((token) => token.name === name) ?? { name, content: undefined }

        if (!option.validate(foundToken.content))
            return undefined

        optionMatches.push({
            option,
            token: foundToken
        })
    }

    return optionMatches
}

export {
    matchArguments,
    matchOptions
}
export type {
    ArgumentMatch,
    OptionMatch
}
