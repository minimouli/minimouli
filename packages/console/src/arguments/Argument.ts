/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

enum ArgumentFlag {
    NONE = 0,
    OPTIONAL = 1
}

abstract class Argument<T> {

    public description = ''

    private _internalContent: string | T | undefined
    private _defaultContent: T | undefined

    private flags = ArgumentFlag.NONE

    constructor(
        public readonly name: string
    ) {}

    setDescription(description: string): this {
        this.description = description
        return this
    }

    setContent(content: string | T): this {
        this._internalContent = content
        return this
    }

    setDefault(defaultContent: T): this {
        this._defaultContent = defaultContent
        return this.setContent(defaultContent)
    }

    optional(): this {
        this.flags |= ArgumentFlag.OPTIONAL
        return this
    }

    validate(content: string | undefined): boolean {

        if (content === undefined)
            return this.hasFlags(ArgumentFlag.OPTIONAL)

        return true
    }

    abstract get content(): T

    get internalContent(): string | T | undefined {
        return this._internalContent
    }

    get defaultContent(): T | undefined {
        return this._defaultContent
    }

    hasFlags(flags: ArgumentFlag): boolean {
        return (this.flags & flags) > 0
    }

}

export {
    Argument,
    ArgumentFlag
}
