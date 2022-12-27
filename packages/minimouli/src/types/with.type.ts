/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type React from 'react'
import type { ReactElement } from 'react'

type CompletedWith<WorkflowProps> = () => (props: WorkflowProps) => ReactElement | null
type With<WorkflowProps, ChildProps> = (Child: React.ComponentType<ChildProps>) => (props: WorkflowProps) => ReactElement | null

export type {
    CompletedWith,
    With
}
