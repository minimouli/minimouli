/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ArgumentToken, OptionToken } from './token.js'

class ArgumentParser {

    public readonly argumentTokenList: ArgumentToken[] = []
    public readonly optionTokenList: OptionToken[] = []

    parse(input: string[]): this {

        const parsedInput = [...input]

        while (parsedInput.length > 0) {

            const item = parsedInput.shift() ?? ''

            if (item.startsWith('--') && item.length > 2)
                this.parseOption(item)

            else if (item.startsWith('-') && !item.startsWith('--') && item.length > 1)
                this.parseNamedArgument(item, parsedInput)

            else
                this.parseAnonymousArgument(item)
        }

        return this
    }

    private parseOption(item: string): void {

        // Remove the -- prefix
        const cleanedItem = item.slice(2)

        if (cleanedItem.includes('='))
            this.parseOptionWithValue(cleanedItem)
        else
            this.parseOptionWithoutValue(cleanedItem)
    }

    /* Parses the following schema: `--option=value` */
    private parseOptionWithValue(item: string): void {

        const separation = item.indexOf('=')
        const name = item.slice(0, separation)
        const content = item.slice(separation + 1)

        this.optionTokenList.push({
            name,
            content
        })
    }

    /* Parses the following schema: `--option` */
    private parseOptionWithoutValue(item: string): void {

        const name = item
        const content = ''

        this.optionTokenList.push({
            name,
            content
        })
    }

    private parseNamedArgument(item: string, input: string[]): void {

        // Remove the - prefix
        const cleanedItem = item.slice(1)

        if (cleanedItem.includes('='))
            this.parseNamedArgumentWithStickyValue(cleanedItem)
        else
            this.parseNamedArgumentWithFollowingValue(cleanedItem, input)
    }

    /* Parses the following schema: `-argument=value` */
    private parseNamedArgumentWithStickyValue(item: string): void {

        const separation = item.indexOf('=')
        const name = item.slice(0, separation)
        const content = item.slice(separation + 1)

        this.argumentTokenList.push({
            name,
            content
        })
    }

    /* Parses the following schema: `-argument value` */
    private parseNamedArgumentWithFollowingValue(item: string, input: string[]): void {

        // Avoid parsing consecutive named arguments
        const isNextItemAValidValue = input.length > 0 && !input[0].startsWith('-')

        const name = item
        const content = isNextItemAValidValue
            ? input.shift() ?? ''
            : undefined

        this.argumentTokenList.push({
            name,
            content
        })
    }

    /* Parses the following schema: `argument` */
    private parseAnonymousArgument(item: string): void {

        const name = undefined
        const content = item

        this.argumentTokenList.push({
            name,
            content
        })
    }

}

export {
    ArgumentParser
}
