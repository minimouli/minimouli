#!/usr/bin/env node
/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { run } from '../dist/index.js'

const args = process.argv.slice(2)
run(args)
