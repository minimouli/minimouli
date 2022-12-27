/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TestStatus } from '@minimouli/types/syntheses'
import type { SuitePlanSynthesis, SuiteSynthesis, TestSynthesis } from '@minimouli/types/syntheses'

type FilterTestPredicate = (test: TestSynthesis) => boolean

const countByStatus = (suites: SuiteSynthesis[]): [number, number] => {

    let passed = 0
    let failed = 0

    for (const suite of suites) {

        const [childPassed, childFailed] = countByStatus(suite.suites)
        passed += childPassed
        failed += childFailed

        passed += suite.tests.filter(test => test.status === TestStatus.Success).length
        failed += suite.tests.filter(test => test.status === TestStatus.Failure).length
    }

    return [passed, failed]
}

const countTotalTests = (suites: (SuiteSynthesis | SuitePlanSynthesis)[]): number => {

    let count = 0

    for (const suite of suites) {
        count += suite.tests.length
        count += countTotalTests(suite.suites)
    }

    return count
}

const filter = (suites: SuiteSynthesis[], predicate: FilterTestPredicate): SuiteSynthesis[] => suites
    .map((suite) => ({
        ...suite,
        tests: suite.tests.filter((test) => predicate(test)),
        suites: filter(suite.suites, predicate)
    }))

export {
    countByStatus,
    countTotalTests,
    filter
}
