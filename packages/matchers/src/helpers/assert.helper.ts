/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const assert = (test: boolean): boolean => test

const assertToBe = <T>(one: T, two: T) => Object.is(one, two)
const assertToEqual = <T>(one: T, two: T): boolean => {

    if (Object.is(one, two))
        return true

    if (typeof one !== 'object' || typeof two !== 'object')
        return false

    const oneEntries = Object.entries(one)
    const twoEntries = Object.entries(two)

    if (oneEntries.length !== twoEntries.length)
        return false

    return oneEntries.every(([oneKey, oneValue], index) => {

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const [twoKey, twoValue] = twoEntries[index]

        if (oneKey !== twoKey)
            return false

        return assertToEqual(oneValue, twoValue)
    })
}

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const assertToBeTruthy = <T>(value: T) => assert(!!value)
// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const assertToBeFalsy = <T>(value: T) => assert(!value)

// eslint-disable-next-line unicorn/no-null
const assertToBeNull = <T>(value: T) => assertToBe(value, null)
const assertToBeNaN = <T>(value: T) => assert(Number.isNaN(value))

export {
    assert,
    assertToBe,
    assertToEqual,
    assertToBeTruthy,
    assertToBeFalsy,
    assertToBeNull,
    assertToBeNaN
}
