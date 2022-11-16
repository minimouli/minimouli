/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Argument } from './argument.js'

class IntegerArgument extends Argument<number> {

    public static DEFAULT_MIN_VALUE = Number.MIN_SAFE_INTEGER
    public static DEFAULT_MAX_VALUE = Number.MAX_SAFE_INTEGER

    private _minimum = IntegerArgument.DEFAULT_MIN_VALUE
    private _maximum = IntegerArgument.DEFAULT_MAX_VALUE

    setMinimum(value: number): this {
        this._minimum = Math.round(value)
        return this
    }

    setMaximum(value: number): this {
        this._maximum = Math.round(value)
        return this
    }

    get minimum(): number {
        return this._minimum
    }

    get maximum(): number {
        return this._maximum
    }

    get content(): number {

        if (this.internalContent === undefined)
            return Number.NaN

        const integerValue = Number.parseInt(this.internalContent.toString())
        return Math.max(this._minimum, Math.min(this._maximum, integerValue))
    }

    override validate(content: string | undefined): boolean {

        if (!super.validate(content))
            return false

        if (content === undefined)
            return true

        if (content === '')
            return false

        const number = Number(content)

        if (Number.isNaN(number))
            return false

        return Number.isSafeInteger(number)
    }

}

export {
    IntegerArgument
}
