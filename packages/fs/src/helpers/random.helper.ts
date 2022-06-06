/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'

const getRandomChar = () => alphabet[Math.floor(Math.random() * alphabet.length)]

const randomString = (length: number) => Array.from({ length })
    .map(() => getRandomChar())
    .join('')

export {
    randomString
}
