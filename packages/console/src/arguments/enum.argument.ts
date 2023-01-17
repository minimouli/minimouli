/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Argument } from './argument.js'

class EnumArgument extends Argument<string> {

    private _values: string[] = []

    setValues(values: string[]): this {
        this._values = values
        return this
    }

    get values(): string[] {
        return this._values
    }

    get content(): string {

        if (this.internalContent === undefined)
            return ''

        if (this._values.includes(this.internalContent))
            return this.internalContent

        return ''
    }

    override validate(content: string | undefined): boolean {

        if (!super.validate(content))
            return false

        if (content === undefined)
            return true

        return this._values.includes(content)
    }

}

export {
    EnumArgument
}
