/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { afterAll } from './blocks/afterAll.js'
import { afterEach } from './blocks/afterEach.js'
import { beforeAll } from './blocks/beforeAll.js'
import { beforeEach } from './blocks/beforeEach.js'
import { expect } from './blocks/expect.js'
import { sleep } from './blocks/sleep.js'
import { suite } from './blocks/suite.js'
import { test } from './blocks/test.js'
import type { Expect, Hook, Sleep, Suite, Test } from '@minimouli/types/blocks'

/* eslint-disable no-var */
declare global {
    var afterAll: Hook
    var afterEach: Hook
    var beforeAll: Hook
    var beforeEach: Hook
    var expect: Expect
    var sleep: Sleep
    var suite: Suite
    var test: Test
}
/* eslint-enable */

global.afterAll = afterAll
global.afterEach = afterEach
global.beforeAll = beforeAll
global.beforeEach = beforeEach
global.expect = expect
global.sleep = sleep
global.suite = suite
global.test = test
