/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type Class<T extends object = object> = new (...args: never[]) => T

export type {
    Class
}
