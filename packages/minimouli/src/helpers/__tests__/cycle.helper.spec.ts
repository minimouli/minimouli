/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getCycleFromDate } from '../cycle.helper.js'

describe('cycle.helper', () => {

    describe('getCycleFromDate', () => {

        it('should return 2021 in january', () => {
            expect(getCycleFromDate(new Date('2022-01-01'))).toBe(2021)
        })

        it('should return 2021 in february', () => {
            expect(getCycleFromDate(new Date('2022-02-01'))).toBe(2021)
        })

        it('should return 2021 in march', () => {
            expect(getCycleFromDate(new Date('2022-03-01'))).toBe(2021)
        })

        it('should return 2021 in april', () => {
            expect(getCycleFromDate(new Date('2022-04-01'))).toBe(2021)
        })

        it('should return 2021 in may', () => {
            expect(getCycleFromDate(new Date('2022-05-01'))).toBe(2021)
        })

        it('should return 2021 in june', () => {
            expect(getCycleFromDate(new Date('2022-06-01'))).toBe(2021)
        })

        it('should return 2021 in july', () => {
            expect(getCycleFromDate(new Date('2022-07-01'))).toBe(2021)
        })

        it('should return 2021 in august', () => {
            expect(getCycleFromDate(new Date('2022-08-01'))).toBe(2021)
        })

        it('should return 2022 in september', () => {
            expect(getCycleFromDate(new Date('2022-09-01'))).toBe(2022)
        })

        it('should return 2022 in october', () => {
            expect(getCycleFromDate(new Date('2022-10-01'))).toBe(2022)
        })

        it('should return 2022 in november', () => {
            expect(getCycleFromDate(new Date('2022-11-01'))).toBe(2022)
        })

        it('should return 2022 in december', () => {
            expect(getCycleFromDate(new Date('2022-12-01'))).toBe(2022)
        })
    })
})
