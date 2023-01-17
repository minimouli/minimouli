/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Box, Text } from 'ink'
import React from 'react'

interface ObjectPrinterProps {
    object: object
}

interface EntryProps<T> {
    name: string
    content: T
}

interface EntryWithoutContentProps {
    name: string
}

const ObjectPrinter = ({ object }: ObjectPrinterProps) => {

    const children = Object.entries(object).map(([name, content], index) => {

        switch (typeof content) {
            case 'string': return <StringEntry key={index} name={name} content={content} />
            case 'number': return <NumberEntry key={index} name={name} content={content} />
            case 'bigint': return <BigIntEntry key={index} name={name} content={content} />
            case 'boolean': return <BooleanEntry key={index} name={name} content={content} />
            case 'symbol': return <SymbolEntry key={index} name={name} content={content} />
            case 'object': {

                if (content instanceof Date)
                    return <StringifiedEntry key={index} name={name} content={content.toISOString()}/>

                return <ObjectEntry key={index} name={name} content={content as object}/>
            }
            case 'function': return <FunctionEntry key={index} name={name} />
            default: return <UndefinedEntry key={index} name={name} />
        }
    })

    return (
        <Box flexDirection="column">
            {children}
        </Box>
    )
}

const StringEntry = ({ name, content }: EntryProps<string>) => (
    <Text>
        <Text color="magenta" >{name}</Text>: <Text color="green" >"{content}"</Text>
    </Text>
)

const NumberEntry = ({ name, content }: EntryProps<number>) => (
    <Text>
        <Text color="magenta" >{name}</Text>: <Text color="yellowBright" >{content.toString()}</Text>
    </Text>
)

const BigIntEntry = ({ name, content }: EntryProps<bigint>) => (
    <Text>
        <Text color="magenta" >{name}</Text>: <Text color="yellowBright" >{content.toString()}</Text>
    </Text>
)

const BooleanEntry = ({ name, content }: EntryProps<boolean>) => (
    <Text>
        <Text color="magenta" >{name}</Text>: <Text color="yellowBright" >{content.toString()}</Text>
    </Text>
)

const SymbolEntry = ({ name, content }: EntryProps<symbol>) => (
    <Text>
        <Text color="magenta" >{name}</Text>: <Text color="magentaBright" >{content.toString()}</Text>
    </Text>
)

const StringifiedEntry = ({ name, content }: EntryProps<string>) => (
    <Text>
        <Text color="magenta" >{name}</Text>: <Text color="magentaBright" >{content}</Text>
    </Text>
)

const ObjectEntry = ({ name, content }: EntryProps<object>) => (
    <Box flexDirection="column" >
        <Text><Text color="magenta" >{name}</Text>:</Text>
        <Box marginLeft={2} >
            <ObjectPrinter object={content} />
        </Box>
    </Box>
)

const UndefinedEntry = ({ name }: EntryWithoutContentProps) => (
    <Text>
        <Text color="magenta" >{name}</Text>: <Text color="blackBright" >undefined</Text>
    </Text>
)

const FunctionEntry = ({ name }: EntryWithoutContentProps) => (
    <Text>
        <Text color="magenta" >{name}</Text>: <Text color="blackBright" >function</Text>
    </Text>
)

export {
    ObjectPrinter
}
