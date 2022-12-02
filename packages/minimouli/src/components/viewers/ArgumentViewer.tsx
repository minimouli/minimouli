/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    ArgumentFlag,
    BooleanArgument,
    EnumArgument,
    IntegerArgument,
    NumberArgument,
    PathArgument,
    StringArgument
} from '@minimouli/console'
import { Box, Text } from 'ink'
import React from 'react'
import type { Argument } from '@minimouli/console'

interface ArgumentViewerProps {
    argument: Argument<unknown>
    option?: boolean
}

interface ArgumentViewerSpecsProps<T extends Argument<unknown>> {
    argument: T
}

const ArgumentViewer = ({ argument, option = false }: ArgumentViewerProps) => {

    const getArgumentSpecsViewer = () => {

        if (argument instanceof BooleanArgument)
            return <BooleanArgumentSpecsViewer argument={argument} />

        if (argument instanceof EnumArgument)
            return <EnumArgumentSpecsViewer argument={argument} />

        if (argument instanceof IntegerArgument)
            return <IntegerArgumentSpecsViewer argument={argument} />

        if (argument instanceof NumberArgument)
            return <NumberArgumentSpecsViewer argument={argument} />

        if (argument instanceof PathArgument)
            return <PathArgumentSpecsViewer argument={argument} />

        if (argument instanceof StringArgument)
            return <StringArgumentSpecsViewer argument={argument} />

        return (
            <Box flexDirection="column" >
                <Text>Type: <Text color="cyan" >Unknown</Text></Text>
                {argument.hasFlags(ArgumentFlag.OPTIONAL) && (
                    <Text color="yellowBright" >Optional</Text>
                )}
            </Box>
        )
    }

    return (
        <Box flexDirection="column" marginBottom={1} >
            <Text bold >{option ? '--' : ''}{argument.name}</Text>
            <Box marginLeft={2} flexDirection="column" >
                <Text>{argument.description}</Text>
                {getArgumentSpecsViewer()}
            </Box>
        </Box>
    )
}

const BooleanArgumentSpecsViewer = ({ argument }: ArgumentViewerSpecsProps<BooleanArgument>) => (
    <Box flexDirection="column" >
        <Text>Type: <Text color="cyan" >Boolean</Text></Text>
        {argument.defaultContent !== undefined && (
            <Text>Default: <Text color="yellowBright" >{argument.defaultContent ? 'true' : 'false'}</Text></Text>
        )}
        {argument.hasFlags(ArgumentFlag.OPTIONAL) && (
            <Text color="yellowBright" >Optional</Text>
        )}
    </Box>
)

const EnumArgumentSpecsViewer = ({ argument }: ArgumentViewerSpecsProps<EnumArgument>) => (
    <Box flexDirection="column" >
        <Text>Type: <Text color="cyan" >Enum</Text></Text>
        {argument.defaultContent !== undefined && (
            <Text>Default: <Text color="green" >"{argument.defaultContent}"</Text></Text>
        )}
        <Box flexDirection="column" >
            <Text>Accepted:</Text>
            <Box flexDirection="column" marginLeft={2} >
                {argument.values.map((value, index) => (
                    <Text key={index} >- <Text color="green" >"{value}"</Text></Text>
                ))}
            </Box>
        </Box>
        {argument.hasFlags(ArgumentFlag.OPTIONAL) && (
            <Text color="yellowBright" >Optional</Text>
        )}
    </Box>
)

const IntegerArgumentSpecsViewer = ({ argument }: ArgumentViewerSpecsProps<IntegerArgument>) => (
    <Box flexDirection="column" >
        <Text>Type: <Text color="cyan" >Integer</Text></Text>
        {argument.defaultContent !== undefined && (
            <Text>Default: <Text color="yellowBright" >{argument.defaultContent}</Text></Text>
        )}
        <Text>Maximum: <Text color="yellowBright" >{argument.maximum}</Text></Text>
        <Text>Minimum: <Text color="yellowBright" >{argument.minimum}</Text></Text>
        {argument.hasFlags(ArgumentFlag.OPTIONAL) && (
            <Text color="yellowBright" >Optional</Text>
        )}
    </Box>
)

const NumberArgumentSpecsViewer = ({ argument }: ArgumentViewerSpecsProps<NumberArgument>) => (
    <Box flexDirection="column" >
        <Text>Type: <Text color="cyan" >Number</Text></Text>
        {argument.defaultContent !== undefined && (
            <Text>Default: <Text color="yellowBright" >{argument.defaultContent}</Text></Text>
        )}
        <Text>Maximum: <Text color="yellowBright" >{argument.maximum}</Text></Text>
        <Text>Minimum: <Text color="yellowBright" >{argument.minimum}</Text></Text>
        {argument.hasFlags(ArgumentFlag.OPTIONAL) && (
            <Text color="yellowBright" >Optional</Text>
        )}
    </Box>
)

const PathArgumentSpecsViewer = ({ argument }: ArgumentViewerSpecsProps<PathArgument>) => (
    <Box flexDirection="column" >
        <Text>Type: <Text color="cyan" >Path</Text></Text>
        {argument.defaultContent !== undefined && (
            <Text>Default: <Text color="white" >{argument.defaultContent.toString()}</Text></Text>
        )}
        {argument.hasFlags(ArgumentFlag.OPTIONAL) && (
            <Text color="yellowBright" >Optional</Text>
        )}
    </Box>
)

const StringArgumentSpecsViewer = ({ argument }: ArgumentViewerSpecsProps<StringArgument>) => (
    <Box flexDirection="column" >
        <Text>Type: <Text color="cyan" >String</Text></Text>
        {argument.defaultContent !== undefined && (
            <Text>Default: <Text color="green" >"{argument.defaultContent}"</Text></Text>
        )}
        {argument.hasFlags(ArgumentFlag.OPTIONAL) && (
            <Text color="yellowBright" >Optional</Text>
        )}
    </Box>
)

export {
    ArgumentViewer
}
