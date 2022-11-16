/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ArgumentParser } from '../argument-parser.js'

describe('ArgumentParser', () => {

    describe('option', () => {

        it('should parse an option with a value', () => {

            const input = ['--option=value']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([])
            expect(parser.optionTokenList).toStrictEqual([
                {
                    name: 'option',
                    content: 'value'
                }
            ])
        })

        it('should parse an option with an empty value', () => {

            const input = ['--option=']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([])
            expect(parser.optionTokenList).toStrictEqual([
                {
                    name: 'option',
                    content: ''
                }
            ])
        })

        it('should parse an option without value', () => {

            const input = ['--option']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([])
            expect(parser.optionTokenList).toStrictEqual([
                {
                    name: 'option',
                    content: ''
                }
            ])
        })

        it('should parse multiple options', () => {

            const input = ['--option1=value1', '--option2', '--option3=', '--option4=value4', '--option5']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([])
            expect(parser.optionTokenList).toStrictEqual([
                {
                    name: 'option1',
                    content: 'value1'
                },
                {
                    name: 'option2',
                    content: ''
                },
                {
                    name: 'option3',
                    content: ''
                },
                {
                    name: 'option4',
                    content: 'value4'
                },
                {
                    name: 'option5',
                    content: ''
                }
            ])
        })

    })

    describe('named argument', () => {

        it('should parse a named argument with a sticky value', () => {

            const input = ['-argument=value']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([
                {
                    name: 'argument',
                    content: 'value'
                }
            ])
            expect(parser.optionTokenList).toStrictEqual([])
        })

        it('should parse a named argument with an empty sticky value', () => {

            const input = ['-argument=']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([
                {
                    name: 'argument',
                    content: ''
                }
            ])
            expect(parser.optionTokenList).toStrictEqual([])
        })

        it('should parse a named argument with a following value', () => {

            const input = ['-argument', 'value']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([
                {
                    name: 'argument',
                    content: 'value'
                }
            ])
            expect(parser.optionTokenList).toStrictEqual([])
        })

        it('should parse a named argument without value', () => {

            const input = ['-argument']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([
                {
                    name: 'argument',
                    content: undefined
                }
            ])
            expect(parser.optionTokenList).toStrictEqual([])
        })

        it('should parse multiple named arguments', () => {

            const input = ['-argument1=value1', '-argument2', '-argument3=', '-argument4=value4', '-argument5']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([
                {
                    name: 'argument1',
                    content: 'value1'
                },
                {
                    name: 'argument2',
                    content: undefined
                },
                {
                    name: 'argument3',
                    content: ''
                },
                {
                    name: 'argument4',
                    content: 'value4'
                },
                {
                    name: 'argument5',
                    content: undefined
                }
            ])
            expect(parser.optionTokenList).toStrictEqual([])
        })

    })

    describe('anonymous argument', () => {

        it('should parse an anonymous argument', () => {

            const input = ['value']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([
                {
                    name: undefined,
                    content: 'value'
                }
            ])
            expect(parser.optionTokenList).toStrictEqual([])
        })

        it('should parse multiple anonymous arguments', () => {

            const input = ['value1', 'value2']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([
                {
                    name: undefined,
                    content: 'value1'
                },
                {
                    name: undefined,
                    content: 'value2'
                }
            ])
            expect(parser.optionTokenList).toStrictEqual([])
        })

    })

    describe('mixed', () => {

        it('it should parse named and anonymous arguments', () => {

            const input = ['value1', '-argument2=value2', '-argument3', '-argument4=value4', 'value5']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([
                {
                    name: undefined,
                    content: 'value1'
                },
                {
                    name: 'argument2',
                    content: 'value2'
                },
                {
                    name: 'argument3',
                    content: undefined
                },
                {
                    name: 'argument4',
                    content: 'value4'
                },
                {
                    name: undefined,
                    content: 'value5'
                }
            ])
            expect(parser.optionTokenList).toStrictEqual([])
        })

        it('should parse options and arguments', () => {

            const input = ['-argument1=value1', '--option1=value2', '-argument2=', '--option2=', '-argument3', '--option3', 'value7']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([
                {
                    name: 'argument1',
                    content: 'value1'
                },
                {
                    name: 'argument2',
                    content: ''
                },
                {
                    name: 'argument3',
                    content: undefined
                },
                {
                    name: undefined,
                    content: 'value7'
                }
            ])
            expect(parser.optionTokenList).toStrictEqual([
                {
                    name: 'option1',
                    content: 'value2'
                },
                {
                    name: 'option2',
                    content: ''
                },
                {
                    name: 'option3',
                    content: ''
                }
            ])
        })

    })

    describe('special cases', () => {

        it('should parse an empty input', () => {

            const input = []
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([])
            expect(parser.optionTokenList).toStrictEqual([])
        })

        it('should parse a single - as an anonymous argument', () => {

            const input = ['value1', '-', 'value3']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([
                {
                    name: undefined,
                    content: 'value1'
                },
                {
                    name: undefined,
                    content: '-'
                },
                {
                    name: undefined,
                    content: 'value3'
                }
            ])
            expect(parser.optionTokenList).toStrictEqual([])
        })

        it('should parse a single -- as an anonymous argument', () => {

            const input = ['value1', '--', 'value3']
            const parser = new ArgumentParser().parse(input)

            expect(parser.argumentTokenList).toStrictEqual([
                {
                    name: undefined,
                    content: 'value1'
                },
                {
                    name: undefined,
                    content: '--'
                },
                {
                    name: undefined,
                    content: 'value3'
                }
            ])
            expect(parser.optionTokenList).toStrictEqual([])
        })

    })

})
