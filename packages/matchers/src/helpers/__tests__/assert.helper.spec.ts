/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    assert,
    assertToBe,
    assertToBeFalsy,
    assertToBeNull,
    assertToBeTruthy,
    assertToEqual
} from '../assert.helper.js'

describe('assert.helper', () => {

    describe('assert', () => {

        it('should return true with a truthy value', () => {
            expect(assert(true)).toBeTruthy()
        })

        it('should return false with a falsy value', () => {
            expect(assert(false)).toBeFalsy()
        })

    })

    describe('assertToBe', () => {

        it('should return true with the same number', () => {

            const result = assertToBe(1, 1)

            expect(result).toBeTruthy()
        })

        it('should return false with two different numbers', () => {

            const result = assertToBe(1, 2)

            expect(result).toBeFalsy()
        })

        it('should return false with -0 and +0', () => {

            const result = assertToBe(-0, +0)

            expect(result).toBeFalsy()
        })

        it('should return true with two NaN values', () => {

            const result = assertToBe(Number.NaN, Number.NaN)

            expect(result).toBeTruthy()
        })

        it('should return true with two null objects', () => {

            // eslint-disable-next-line unicorn/no-null
            const result = assertToBe(null, null)

            expect(result).toBeTruthy()
        })

        it('should return true with two undefined values', () => {

            // eslint-disable-next-line unicorn/no-useless-undefined
            const result = assertToBe(undefined, undefined)

            expect(result).toBeTruthy()
        })

        it('should return true with the same object', () => {

            const object = {
                en: 'hello',
                fr: 'bonjour',
                es: 'hola'
            }

            const result = assertToBe(object, object)

            expect(result).toBeTruthy()
        })

        it('should return false with two identical objects', () => {

            const object1 = { en: 'hello' }
            const object2 = { en: 'hello' }

            const result = assertToBe(object1, object2)

            expect(result).toBeFalsy()
        })

        it('should return false with two different objects', () => {

            const object1 = { en: 'hello' }
            const object2 = { fr: 'bonjour' }

            const result = assertToBe<object>(object1, object2)

            expect(result).toBeFalsy()
        })

    })

    describe('assertToEqual', () => {

        it('should return true with the same number', () => {

            const result = assertToEqual(1, 1)

            expect(result).toBeTruthy()
        })

        it('should return false with two different numbers', () => {

            const result = assertToEqual(1, 2)

            expect(result).toBeFalsy()
        })

        it('should return false with -0 and +0', () => {

            const result = assertToEqual(-0, +0)

            expect(result).toBeFalsy()
        })

        it('should return true with two NaN values', () => {

            const result = assertToEqual(Number.NaN, Number.NaN)

            expect(result).toBeTruthy()
        })

        it('should return true with two null objects', () => {

            // eslint-disable-next-line unicorn/no-null
            const result = assertToEqual(null, null)

            expect(result).toBeTruthy()
        })

        it('should return true with two undefined values', () => {

            // eslint-disable-next-line unicorn/no-useless-undefined
            const result = assertToEqual(undefined, undefined)

            expect(result).toBeTruthy()
        })

        it('should return true with the same object', () => {

            const object = {
                en: 'hello',
                fr: 'bonjour',
                es: 'hola'
            }

            const result = assertToEqual(object, object)

            expect(result).toBeTruthy()
        })

        it('should return true with two identical objects', () => {

            const object1 = { en: 'hello' }
            const object2 = { en: 'hello' }

            const result = assertToEqual(object1, object2)

            expect(result).toBeTruthy()
        })

        it('should return false with two different objects', () => {

            const object1 = { en: 'hello' }
            const object2 = { fr: 'bonjour' }

            const result = assertToEqual<object>(object1, object2)

            expect(result).toBeFalsy()
        })

        it('should return false when an object\'s key has a different value', () => {

            const object1 = { en: 'hello' }
            const object2 = { en: 'hi' }

            const result = assertToEqual<object>(object1, object2)

            expect(result).toBeFalsy()
        })

        it('should return false when the expected object has an extra key', () => {

            const object1 = { en: 'hello', fr: 'bonjour' }
            const object2 = { en: 'hello' }

            const result = assertToEqual<object>(object1, object2)

            expect(result).toBeFalsy()
        })

        it('should return false when the received object has an extra key', () => {

            const object1 = { en: 'hello' }
            const object2 = { en: 'hello', fr: 'bonjour' }

            const result = assertToEqual<object>(object1, object2)

            expect(result).toBeFalsy()
        })

        it('should return true with two identical diversified objects', () => {

            const object1 = {
                name: 'Zombie',
                health: 80,
                position: {
                    x: 2.34,
                    y: 6.78
                },
                inventory: [1, 2, 3, 4, 5, 6]
            }

            const object2 = {
                name: 'Zombie',
                health: 80,
                position: {
                    x: 2.34,
                    y: 6.78
                },
                inventory: [1, 2, 3, 4, 5, 6]
            }

            const result = assertToEqual(object1, object2)

            expect(result).toBeTruthy()
        })

        it('should return true with two identical nested objects', () => {

            const object1 = { a: { b: { c: { d: true } } } }
            const object2 = { a: { b: { c: { d: true } } } }

            const result = assertToEqual(object1, object2)

            expect(result).toBeTruthy()
        })

        it('should return false with two different nested objects', () => {

            const object1 = { a: { b: { c: { d: true } } } }
            const object2 = { a: { b: { c: { d: false } } } }

            const result = assertToEqual(object1, object2)

            expect(result).toBeFalsy()
        })

        it('should return true with the same array', () => {

            const array = [true, 2, 2.5, '3']

            const result = assertToEqual(array, array)

            expect(result).toBeTruthy()
        })

        it('should return true with two identical arrays', () => {

            const array1 = [true, 2, 2.5, '3']
            const array2 = [true, 2, 2.5, '3']

            const result = assertToEqual(array1, array2)

            expect(result).toBeTruthy()
        })

        it('should return false with two different same-sized arrays', () => {

            const array1 = [true, 2, 2.5, '3']
            const array2 = [true, 3, 2.5, '3']

            const result = assertToEqual(array1, array2)

            expect(result).toBeFalsy()
        })

        it('should return false with two different not same-sized arrays', () => {

            const array1 = [true, 2, 2.5, '3']
            const array2 = [true, 2, 2.5, '3', 4, 5]

            const result = assertToEqual(array1, array2)

            expect(result).toBeFalsy()
        })

        it('should return true with two arrays containing identical objects', () => {

            const array1 = [{ a: 1 }, { b: 2 }, { c: 3 }]
            const array2 = [{ a: 1 }, { b: 2 }, { c: 3 }]

            const result = assertToEqual(array1, array2)

            expect(result).toBeTruthy()
        })

        it('should return false with two arrays containing different objects', () => {

            const array1 = [{ a: 1 }, { b: 2 }, { c: 3 }]
            const array2 = [{ a: 1 }, { b: 2 }, { c: 4 }]

            const result = assertToEqual(array1, array2)

            expect(result).toBeFalsy()
        })

        it('should return true with two identical arrays containing NaN value', () => {

            const array1 = [1, 2, Number.NaN, 3, 4]
            const array2 = [1, 2, Number.NaN, 3, 4]

            const result = assertToEqual(array1, array2)

            expect(result).toBeTruthy()
        })

    })

    describe('assertToBeTruthy', () => {

        it('should return true with true', () => {
            expect(assertToBeTruthy(true)).toBeTruthy()
        })

        it('should return false with false', () => {
            expect(assertToBeTruthy(false)).toBeFalsy()
        })

        it('should return true with a positive number', () => {
            expect(assertToBeTruthy(2)).toBeTruthy()
        })

        it('should return true with a negative number', () => {
            expect(assertToBeTruthy(-1)).toBeTruthy()
        })

        it('should return false with -0', () => {
            expect(assertToBeTruthy(-0)).toBeFalsy()
        })

        it('should return false with +0', () => {
            expect(assertToBeTruthy(+0)).toBeFalsy()
        })

        it('should return false with NaN', () => {
            expect(assertToBeTruthy(Number.NaN)).toBeFalsy()
        })

        it('should return false with a null object', () => {
            // eslint-disable-next-line unicorn/no-null
            expect(assertToBeTruthy(null)).toBeFalsy()
        })

        it('should return false with an undefined value', () => {
            // eslint-disable-next-line unicorn/no-useless-undefined
            expect(assertToBeTruthy(undefined)).toBeFalsy()
        })

        it('should return true with an object', () => {
            expect(assertToBeTruthy({})).toBeTruthy()
        })

    })

    describe('assertToBeFalsy', () => {

        it('should return false with true', () => {
            expect(assertToBeFalsy(true)).toBeFalsy()
        })

        it('should return true with false', () => {
            expect(assertToBeFalsy(false)).toBeTruthy()
        })

        it('should return false with a positive number', () => {
            expect(assertToBeFalsy(2)).toBeFalsy()
        })

        it('should return false with a negative number', () => {
            expect(assertToBeFalsy(-1)).toBeFalsy()
        })

        it('should return true with -0', () => {
            expect(assertToBeFalsy(-0)).toBeTruthy()
        })

        it('should return true with +0', () => {
            expect(assertToBeFalsy(+0)).toBeTruthy()
        })

        it('should return true with NaN', () => {
            expect(assertToBeFalsy(Number.NaN)).toBeTruthy()
        })

        it('should return true with a null object', () => {
            // eslint-disable-next-line unicorn/no-null
            expect(assertToBeFalsy(null)).toBeTruthy()
        })

        it('should return true with an undefined value', () => {
            // eslint-disable-next-line unicorn/no-useless-undefined
            expect(assertToBeFalsy(undefined)).toBeTruthy()
        })

        it('should return false with an object', () => {
            expect(assertToBeFalsy({})).toBeFalsy()
        })

    })

    describe('assertToBeNull', () => {

        it('should return true with a null object', () => {
            // eslint-disable-next-line unicorn/no-null
            expect(assertToBeNull(null)).toBeTruthy()
        })

        it('should return false with an object', () => {
            expect(assertToBeNull({})).toBeFalsy()
        })

        it('should return false with 0', () => {
            expect(assertToBeNull(0)).toBeFalsy()
        })

        it('should return false with an undefined value', () => {
            // eslint-disable-next-line unicorn/no-useless-undefined
            expect(assertToBeNull(undefined)).toBeFalsy()
        })

    })

})
