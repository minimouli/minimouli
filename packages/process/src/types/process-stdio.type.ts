/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Descriptor, NativeReadable, NativeWritable } from '@minimouli/types/stream'

type FileDescriptorInstruction = 'pipe' | 'ignore' | 'inherit'

type Stdin = Descriptor.Stdin | FileDescriptorInstruction | NativeReadable | null
type Stdout = Descriptor.Stdout | FileDescriptorInstruction | NativeWritable | null
type Stderr = Descriptor.Stderr | FileDescriptorInstruction | NativeWritable | null
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
