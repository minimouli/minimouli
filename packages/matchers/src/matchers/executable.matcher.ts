/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import crypto from 'node:crypto'
import { File, Path } from '@minimouli/fs'
import { HintStatus, HintType, ObjectType, HintCategory } from '@minimouli/types/hints'
import { Descriptor } from '@minimouli/types/stream'
import { assertToBe, assertToBeFalsy, assertToBeTruthy, assertToEqual } from '../helpers/assert.helper.js'
import type { EqualityHint, MatcherErrorHint, StreamDifferenceHint, StringDifferenceHint } from '@minimouli/types/hints'
import type { ExecutableInterface, PathInterface } from '@minimouli/types/interfaces'
import type { Matcher } from '@minimouli/types/matchers'
import type { MatcherOutputOptions } from '@minimouli/types/options'

const getOutputPath = (executable: ExecutableInterface, descriptor: Descriptor): Path | undefined => {

    if (descriptor === Descriptor.Stdout)
        return Path.fromAbsolute(executable.savedStdoutPath.toString())

    if (descriptor === Descriptor.Stderr)
        return Path.fromAbsolute(executable.savedStderrPath.toString())

    return undefined
}

class ExecutableMatcher implements Matcher<ExecutableInterface> {

    toBe(received: ExecutableInterface, expected: ExecutableInterface): EqualityHint {

        const pass = assertToEqual(received, expected)

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: 'Executable',
                type: ObjectType.Object
            },
            expected: {
                value: 'Executable',
                type: ObjectType.Object
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected']
                },
                method: 'toBe'
            }
        }
    }

    toBeTruthy(received: ExecutableInterface): EqualityHint {

        const pass = assertToBeTruthy(received)

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: 'Executable',
                type: ObjectType.Object
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: []
                },
                method: 'toBeTruthy'
            }
        }
    }

    toBeFalsy(received: ExecutableInterface): EqualityHint {

        const pass = assertToBeFalsy(received)

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            received: {
                value: 'Executable',
                type: ObjectType.Object
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: []
                },
                method: 'toBeFalsy'
            }
        }
    }

    toBeNull(): EqualityHint {
        return {
            type: HintType.Equality,
            status: HintStatus.Failure,
            received: {
                value: 'Executable',
                type: ObjectType.Object
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: []
                },
                method: 'toBeNull'
            }
        }
    }

    toBeDefined(): EqualityHint {
        return {
            type: HintType.Equality,
            status: HintStatus.Success,
            received: {
                value: 'Executable',
                type: ObjectType.Object
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: []
                },
                method: 'toBeDefined'
            }
        }
    }

    toBeUndefined(): EqualityHint {
        return {
            type: HintType.Equality,
            status: HintStatus.Failure,
            received: {
                value: 'Executable',
                type: ObjectType.Object
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: []
                },
                method: 'toBeUndefined'
            }
        }
    }

    toBeNaN(): MatcherErrorHint {
        return {
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: 'Executable',
                type: ObjectType.Object
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: []
                },
                method: 'toBeNaN'
            }
        }
    }

    toBeLessThan(): MatcherErrorHint {
        return {
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: 'Executable',
                type: ObjectType.Object
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected']
                },
                method: 'toBeLessThan'
            }
        }
    }

    toBeLessThanOrEqual(): MatcherErrorHint {
        return {
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: 'Executable',
                type: ObjectType.Object
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected']
                },
                method: 'toBeLessThanOrEqual'
            }
        }
    }

    toBeGreaterThan(): MatcherErrorHint {
        return {
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: 'Executable',
                type: ObjectType.Object
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected']
                },
                method: 'toBeGreaterThan'
            }
        }
    }

    toBeGreaterThanOrEqual(): MatcherErrorHint {
        return {
            type: HintType.MatcherError,
            status: HintStatus.Failure,
            message: 'received must be a number',
            received: {
                value: 'Executable',
                type: ObjectType.Object
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected']
                },
                method: 'toBeGreaterThanOrEqual'
            }
        }
    }

    toExitWith(received: ExecutableInterface, expected: number): EqualityHint {

        const pass = assertToBe(received.exitCode, expected)
        const isReceivedNull = received.exitCode === null

        return {
            type: HintType.Equality,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            category: HintCategory.ExitCode,
            received: {
                value: isReceivedNull ? 'null' : received.exitCode.toString(),
                type: isReceivedNull ? ObjectType.Object : ObjectType.Number
            },
            expected: {
                value: expected.toString(),
                type: ObjectType.Number
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected']
                },
                method: 'toExitWith'
            }
        }
    }

    async toOutput(
        received: ExecutableInterface,
        expected: string[] | PathInterface,
        options: Partial<MatcherOutputOptions>
    ): Promise<StringDifferenceHint | StreamDifferenceHint | MatcherErrorHint> {

        const matcherOutputOptions: MatcherOutputOptions = {
            descriptor: Descriptor.Stdout,
            start: 0,
            end: Number.POSITIVE_INFINITY,
            ...options
        }
        const outputPath = getOutputPath(received, matcherOutputOptions.descriptor)

        if (outputPath === undefined)
            return {
                type: HintType.MatcherError,
                status: HintStatus.Failure,
                message: 'The output cannot be compared, the desired output file is undefined',
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected', 'options']
                    },
                    method: 'toOutput'
                }
            }

        const outputFile = new File(outputPath)

        if (Array.isArray(expected))
            return this.toOutputWithArray(outputFile, expected, matcherOutputOptions)

        return this.toOutputWithStream(outputFile, expected)
    }

    private async toOutputWithArray(
        received: File,
        expected: string[],
        options: MatcherOutputOptions
    ): Promise<StringDifferenceHint | MatcherErrorHint> {

        const { contents, error } = await received.getContents()

        if (error !== undefined || contents === null)
            return {
                type: HintType.MatcherError,
                status: HintStatus.Failure,
                message: 'The output cannot be compared, the desired output file is not readable',
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected', 'options']
                    },
                    method: 'toOutput'
                }
            }

        const lines = contents.toString()
            .split('\n')
            .slice(options.start, options.end)
        const pass = assertToEqual(lines, expected)

        return {
            type: HintType.StringDifference,
            status: pass ? HintStatus.Success : HintStatus.Failure,
            category: HintCategory.Output,
            received: {
                value: lines,
                type: ObjectType.String
            },
            expected: {
                value: expected,
                type: ObjectType.String
            },
            snippet: {
                arguments: {
                    received: ['received'],
                    expected: ['expected', 'options']
                },
                method: 'toOutput'
            }
        }
    }

    private async toOutputWithStream(
        received: File,
        expected: PathInterface
    ): Promise<StreamDifferenceHint | MatcherErrorHint> {

        const expectedPath = Path.fromAbsolute(expected.toString())
        const expectedFile = new File(expectedPath)

        const algorithm = 'sha1'
        const receivedSum = crypto.createHash(algorithm)
        const expectedSum = crypto.createHash(algorithm)

        const { stream: receivedStream, error: error1 } = await received.openReadable()

        if (error1 !== undefined)
            return {
                type: HintType.MatcherError,
                status: HintStatus.Failure,
                message: 'The output cannot be compared, the desired output file is not readable',
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected', 'options']
                    },
                    method: 'toOutput'
                }
            }

        const { stream: expectedStream, error: error2 } = await expectedFile.openReadable()

        if (error2 !== undefined)
            return {
                type: HintType.MatcherError,
                status: HintStatus.Failure,
                message: 'The output cannot be compared, the comparison file is not readable',
                snippet: {
                    arguments: {
                        received: ['received'],
                        expected: ['expected', 'options']
                    },
                    method: 'toOutput'
                }
            }

        return new Promise((resolve) => {

            Promise.allSettled([
                new Promise<void>((handleClose) => receivedStream.on('close', handleClose)),
                new Promise<void>((handleClose) => expectedStream.on('close', handleClose))
            ])
            .then(() => {

                const receivedHash = receivedSum.digest('hex')
                const expectedHash = expectedSum.digest('hex')

                const pass = assertToBe(receivedHash, expectedHash)

                resolve({
                    type: HintType.StreamDifference,
                    status: pass ? HintStatus.Success : HintStatus.Failure,
                    category: HintCategory.Output,
                    snippet: {
                        arguments: {
                            received: ['received'],
                            expected: ['expected', 'options']
                        },
                        method: 'toOutput'
                    }
                })
            })
            .catch(() => {
                resolve({
                    type: HintType.MatcherError,
                    status: HintStatus.Failure,
                    message: 'The output cannot be compared',
                    snippet: {
                        arguments: {
                            received: ['received'],
                            expected: ['expected', 'options']
                        },
                        method: 'toOutput'
                    }
                })
            })

            receivedStream.pipe(receivedSum)
            expectedStream.pipe(expectedSum)
        })
    }

}

export {
    ExecutableMatcher
}
