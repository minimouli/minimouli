/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Argument } from './Argument.js'

class NumberArgument extends Argument<number> {

    public static DEFAULT_MIN_VALUE = Number.NEGATIVE_INFINITY
    public static DEFAULT_MAX_VALUE = Number.POSITIVE_INFINITY

    public _minimum = NumberArgument.DEFAULT_MIN_VALUE
    public _maximum = NumberArgument.DEFAULT_MAX_VALUE

    setMinimum(value: number): this {
        this._minimum = value
        return this
    }

    setMaximum(value: number): this {
        this._maximum = value
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

        const integerValue = Number.parseFloat(this.internalContent.toString())
        return Math.max(this._minimum, Math.min(this._maximum, integerValue))
    }

    override validate(content: string | undefined): boolean {

        if (!super.validate(content))
            return false

        if (content === undefined)
            return true

        if (content === '')
            return false

        return !Number.isNaN(Number(content))
    }
}

export {
    NumberArgument
}
