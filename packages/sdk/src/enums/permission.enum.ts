/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

enum Permission {
    ReadAllAccounts = 'Permission.ReadAllAccounts',
    UpdateOwnAccount = 'Permission.UpdateOwnAccount',
    UpdateAllAccounts = 'Permission.UpdateAllAccounts',
    UpdateAccountPermissions = 'Permission.UpdateAccountPermissions',
    DeleteOwnAccount = 'Permission.DeleteOwnAccount',
    DeleteAllAccounts = 'Permission.DeleteAllAccounts',
    ReadOwnAuthTokens = 'Permission.ReadOwnAuthTokens',
    ReadAllAuthTokens = 'Permission.ReadAllAuthTokens',
    DeleteOwnAuthTokens = 'Permission.DeleteOwnAuthTokens',
    DeleteAllAuthTokens = 'Permission.DeleteAllAuthTokens',
    CreateMoulinette = 'Permission.CreateMoulinette',
    UpdateMoulinette = 'Permission.UpdateMoulinette',
    DeleteMoulinette = 'Permission.DeleteMoulinette',
    CreateMoulinetteSource = 'Permission.CreateMoulinetteSource',
    UpdateMoulinetteSource = 'Permission.UpdateMoulinetteSource',
    DeleteMoulinetteSource = 'Permission.DeleteMoulinetteSource',
    CreateOrganization = 'Permission.CreateOrganization',
    UpdateOrganization = 'Permission.UpdateOrganization',
    DeleteOrganization = 'Permission.DeleteOrganization',
    CreateProject = 'Permission.CreateProject',
    UpdateProject = 'Permission.UpdateProject',
    DeleteProject = 'Permission.DeleteProject',
    CreateRun = 'Permission.CreateRun',
    ReadAllRuns = 'Permission.ReadAllRuns',
    DeleteAllRuns = 'Permission.DeleteAllRuns'
}

export {
    Permission
}
