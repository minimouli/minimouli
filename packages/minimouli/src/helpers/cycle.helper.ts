/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Month } from '../enums/month.enum.js'

const getCycleFromDate = (date: Date): number => {

    const month = date.getMonth()

    if (month < Month.September)
        return date.getFullYear() - 1

    return date.getFullYear()
}

const getCurrentCycle = () => getCycleFromDate(new Date())

export {
    getCurrentCycle,
    getCycleFromDate
}
