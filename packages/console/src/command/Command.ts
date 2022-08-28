/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ReactElement } from 'react'
import type { Argument } from '../arguments/Argument.js'

abstract class Command {

    public readonly arguments: Argument<unknown>[] = []
    public readonly options: Argument<unknown>[] = []

    arg<T = unknown>(argument: Argument<T>): Argument<T> {
        this.arguments.push(argument)
        return argument
    }

    opt<T = unknown>(option: Argument<T>): Argument<T> {

        option.optional()
        this.options.push(option)

        return option
    }

    abstract execute(): ReactElement

    abstract get name(): string
    abstract get description(): string[]
    abstract get shortDescription(): string

    get aliases(): string[] {
        return []
    }

}

export {
    Command
}
