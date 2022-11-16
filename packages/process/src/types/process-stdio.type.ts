/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Descriptor, NativeReadable, NativeWritable } from '@minimouli/types/stream'

type FileDescriptorInstruction = 'pipe' | 'ignore' | 'inherit'

type Stdin = Descriptor.STDIN | FileDescriptorInstruction | NativeReadable | null
type Stdout = Descriptor.STDOUT | FileDescriptorInstruction | NativeWritable | null
type Stderr = Descriptor.STDERR | FileDescriptorInstruction | NativeWritable | null
type StdioValue = Stdin | Stdout | Stderr

interface ProcessStdioType {
    stdin: Stdin
    stdout: Stdout
    stderr: Stderr
}

export type {
    ProcessStdioType,
    Stdin,
    Stdout,
    Stderr,
    StdioValue,
    FileDescriptorInstruction
}
