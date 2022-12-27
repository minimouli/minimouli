/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'

const applyInverseTransformation = (content: string, value: number): string => {

    if (value <= 0)
        return content

    const cursorPosition = Math.floor(content.length * value)

    const inversedPart = content.slice(0, Math.max(0, cursorPosition))
    const preservedPart = content.slice(Math.max(0, cursorPosition))

    return `${chalk.inverse(inversedPart)}${preservedPart}`
}

const createProgressBarContent = (message: string, timer: string, width: number): string => {

    if (message.length > width)
        return message.slice(0, Math.max(0, width))

    if (message.length + timer.length >= width)
        return `${message}${' '.repeat(width - message.length)}`

    const content = [
        message,
        ' '.repeat(width - message.length - timer.length),
        timer
    ]

    return content.join('')
}

export {
    applyInverseTransformation,
    createProgressBarContent
}
