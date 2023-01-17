/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    BooleanMatcher,
    ExecutableMatcher,
    NumberMatcher,
    ObjectMatcher,
    StringMatcher,
    UndefinedMatcher
} from '@minimouli/matchers'
import { HintStatus, HintType } from '@minimouli/types/hints'
import { AssertionError } from '../errors/assertion.error.js'
import { MatcherError } from '../errors/matcher.error.js'
import { Executable } from '../objects/executable.js'
import type { Expect } from '@minimouli/types/blocks'
import type { Hint } from '@minimouli/types/hints'
import type { Matcher } from '@minimouli/types/matchers'

const getMatcher = <R>(received: R): Matcher<R> => {

    if (received instanceof Executable)
        // @ts-expect-error ExecutableMatcher implements Matcher<Executable>
        return new ExecutableMatcher()

    switch (typeof received) {
        case 'boolean':
            // @ts-expect-error BooleanMatcher implements Matcher<boolean>
            return new BooleanMatcher()
        case 'number':
            // @ts-expect-error NumberMatcher implements Matcher<number>
            return new NumberMatcher()
        case 'object':
            // @ts-expect-error ObjectMatcher implements Matcher<object | null>
            return new ObjectMatcher()
        case 'string':
            // @ts-expect-error StringMatcher implements Matcher<string>
            return new StringMatcher()
        case 'undefined':
            // @ts-expect-error UndefinedMatcher implements Matcher<undefined>
            return new UndefinedMatcher()
        default:
            throw new MatcherError(`The type of the received argument (${typeof received}) is not supported`)
    }
}

const createMatcherFn = <R, A extends unknown[]>(received: R, fn: (received: R, ...args: A) => Hint) => (...args: A) => {

    const hint = fn(received, ...args)

    if (hint.status === HintStatus.Failure)
        throw new AssertionError(hint)
}

const createConcurrentMatcherFn = <R, A extends unknown[]>(received: R, fn: (received: R, ...args: A) => Promise<Hint>) => async (...args: A) => {

    const hint = await fn(received, ...args)

    if (hint.status === HintStatus.Failure)
        throw new AssertionError(hint)
}

const createNotMatcherFn = <R, A extends unknown[]>(received: R, fn: (received: R, ...args: A) => Hint) => (...args: A) => {

    const hint = fn(received, ...args)

    if (hint.type !== HintType.MatcherError)
        hint.status = hint.status === HintStatus.Success ? HintStatus.Failure : HintStatus.Success

    if (hint.snippet)
        hint.snippet.method = `not.${hint.snippet.method}`

    if (hint.status === HintStatus.Failure)
        throw new AssertionError(hint)
}

const createConcurrentNotMatcherFn = <R, A extends unknown[]>(received: R, fn: (received: R, ...args: A) => Promise<Hint>) => async (...args: A) => {

    const hint = await fn(received, ...args)

    if (hint.type !== HintType.MatcherError)
        hint.status = hint.status === HintStatus.Success ? HintStatus.Failure : HintStatus.Success

    if (hint.snippet)
        hint.snippet.method = `not.${hint.snippet.method}`

    if (hint.status === HintStatus.Failure)
        throw new AssertionError(hint)
}

const expect: Expect = <R>(received: R) => {

    const matcher = getMatcher(received)

    return {
        toBe: createMatcherFn(received, matcher.toBe.bind(matcher)),
        toBeTruthy: createMatcherFn(received, matcher.toBeTruthy.bind(matcher)),
        toBeFalsy: createMatcherFn(received, matcher.toBeFalsy.bind(matcher)),
        toBeNull: createMatcherFn(received, matcher.toBeNull.bind(matcher)),
        toBeDefined: createMatcherFn(received, matcher.toBeDefined.bind(matcher)),
        toBeUndefined: createMatcherFn(received, matcher.toBeUndefined.bind(matcher)),
        toBeNaN: createMatcherFn(received, matcher.toBeNaN.bind(matcher)),
        toBeLessThan: createMatcherFn(received, matcher.toBeLessThan.bind(matcher)),
        toBeLessThanOrEqual: createMatcherFn(received, matcher.toBeLessThanOrEqual.bind(matcher)),
        toBeGreaterThan: createMatcherFn(received, matcher.toBeGreaterThan.bind(matcher)),
        toBeGreaterThanOrEqual: createMatcherFn(received, matcher.toBeGreaterThanOrEqual.bind(matcher)),
        toExitWith: createMatcherFn(received, matcher.toExitWith.bind(matcher)),
        toOutput: createConcurrentMatcherFn(received, matcher.toOutput.bind(matcher)),
        not: {
            toBe: createNotMatcherFn(received, matcher.toBe.bind(matcher)),
            toBeTruthy: createNotMatcherFn(received, matcher.toBeTruthy.bind(matcher)),
            toBeFalsy: createNotMatcherFn(received, matcher.toBeFalsy.bind(matcher)),
            toBeNull: createNotMatcherFn(received, matcher.toBeNull.bind(matcher)),
            toBeDefined: createNotMatcherFn(received, matcher.toBeDefined.bind(matcher)),
            toBeUndefined: createNotMatcherFn(received, matcher.toBeUndefined.bind(matcher)),
            toBeNaN: createNotMatcherFn(received, matcher.toBeNaN.bind(matcher)),
            toBeLessThan: createNotMatcherFn(received, matcher.toBeLessThan.bind(matcher)),
            toBeLessThanOrEqual: createNotMatcherFn(received, matcher.toBeLessThanOrEqual.bind(matcher)),
            toBeGreaterThan: createNotMatcherFn(received, matcher.toBeGreaterThan.bind(matcher)),
            toBeGreaterThanOrEqual: createNotMatcherFn(received, matcher.toBeGreaterThanOrEqual.bind(matcher)),
            toExitWith: createNotMatcherFn(received, matcher.toExitWith.bind(matcher)),
            toOutput: createConcurrentNotMatcherFn(received, matcher.toOutput.bind(matcher))
        }
    }
}

export {
    expect
}
