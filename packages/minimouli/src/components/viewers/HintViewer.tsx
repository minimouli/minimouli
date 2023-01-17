/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HintCategory } from '@minimouli/types/hints'
import { Text } from 'ink'
import React from 'react'
import type { Hint } from '@minimouli/types/hints'

interface HintViewerProps {
    hint: Hint
}

const HintViewer = ({ hint }: HintViewerProps) => {
    switch (hint.category) {
        case HintCategory.Output:
            return <Text dimColor >Output differs</Text>
        case HintCategory.ExitCode:
            return <Text dimColor >Bad exit code</Text>
        case HintCategory.Timeout:
            return <Text dimColor >Timeout</Text>
        default:
            return <Text dimColor >Other error</Text>
    }
}

export {
    HintViewer
}
