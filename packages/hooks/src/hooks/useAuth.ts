/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext } from 'react'
import { AuthContext } from '../contexts/auth.context.js'

const useAuth = () => useContext(AuthContext)

export {
    useAuth
}
