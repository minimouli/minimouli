/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { LocatedTestGroup, SuiteSynthesis } from '@minimouli/types/syntheses'

type FilterPredicate = (testGroup: LocatedTestGroup) => boolean

const fromSuites = (suites: SuiteSynthesis[], pathPrefix: string[] = []): LocatedTestGroup[] => {

    const currentTestGroup = suites.map<LocatedTestGroup>((suite) => [
        [...pathPrefix, suite.name],
        suite.tests
    ])
    const childTestGroup = suites.flatMap((suite) => fromSuites(suite.suites, [...pathPrefix, suite.name]))

    return [...currentTestGroup, ...childTestGroup]
}

const filter = (testGroups: LocatedTestGroup[], predicate: FilterPredicate) =>
    testGroups.filter((suite) => predicate(suite))

const sort = (testGroups: LocatedTestGroup[]): LocatedTestGroup[] =>
    testGroups.sort((firstGroup, secondGroup) => {

        const firstGroupName = [firstGroup].join('')
        const secondGroundName = [secondGroup].join('')

        return firstGroupName.localeCompare(secondGroundName)
    })

export {
    fromSuites,
    filter,
    sort
}
