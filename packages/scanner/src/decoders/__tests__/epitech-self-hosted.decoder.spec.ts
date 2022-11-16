/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EpitechSelfHostedDecoder } from '../epitech-self-hosted.decoder.js'

describe('EpitechSelfHostedDecoder', () => {

    const result = {
        keywords: {
            school: 'epitech',
            project: 'bistromatic'
        },
        project: {
            name: 'bistromatic',
            directories: ['CPE'],
            organization: 'epitech'
        }
    }

    it('should match the project url', () => {
        const url = 'git@git.epitech.eu:/john.doe@epitech.eu/CPE_bistromatic_2019.git'

        expect(new EpitechSelfHostedDecoder().decode(url)).toStrictEqual({
            ...result,
            repository: {
                host: 'git.epitech.eu',
                url
            }
        })
    })

    it('should not match an url from another code repository server', () => {
        const url = 'git@github.com:Epitech/B-CPE-000-CITY-1-1-bistromatic-john.doe.git'

        expect(new EpitechSelfHostedDecoder().decode(url)).toBeUndefined()
    })

    it('should match without the .git suffix', () => {
        const url = 'git@git.epitech.eu:/john.doe@epitech.eu/CPE_bistromatic_2019'

        expect(new EpitechSelfHostedDecoder().decode(url)).toStrictEqual({
            ...result,
            repository: {
                host: 'git.epitech.eu',
                url
            }
        })
    })

    describe('project name', () => {

        it('should match an uppercase project name', () => {
            const url = 'git@git.epitech.eu:/john.doe@epitech.eu/CPE_BSQ_2019.git'

            expect(new EpitechSelfHostedDecoder().decode(url)).toStrictEqual({
                keywords: {
                    school: 'epitech',
                    project: 'bsq'
                },
                project: {
                    name: 'BSQ',
                    directories: ['CPE'],
                    organization: 'epitech'
                },
                repository: {
                    host: 'git.epitech.eu',
                    url
                }
            })
        })

        it('should match an alphanumeric project name', () => {
            const url = 'git@git.epitech.eu:/john.doe@epitech.eu/PSU_42sh_2019.git'

            expect(new EpitechSelfHostedDecoder().decode(url)).toStrictEqual({
                keywords: {
                    school: 'epitech',
                    project: '42sh'
                },
                project: {
                    name: '42sh',
                    directories: ['PSU'],
                    organization: 'epitech'
                },
                repository: {
                    host: 'git.epitech.eu',
                    url
                }
            })
        })

        it('should match an alphanumeric project name', () => {
            const url = 'git@git.epitech.eu:/john.doe@epitech.eu/PSU_my_printf_2019.git'

            expect(new EpitechSelfHostedDecoder().decode(url)).toStrictEqual({
                keywords: {
                    school: 'epitech',
                    project: 'my_printf'
                },
                project: {
                    name: 'my_printf',
                    directories: ['PSU'],
                    organization: 'epitech'
                },
                repository: {
                    host: 'git.epitech.eu',
                    url
                }
            })
        })

        it('should match a project name that contains hyphen', () => {
            const url = 'git@git.epitech.eu:/john.doe@epitech.eu/CPool_match-nmatch_2019.git'

            expect(new EpitechSelfHostedDecoder().decode(url)).toStrictEqual({
                keywords: {
                    school: 'epitech',
                    project: 'match-nmatch'
                },
                project: {
                    name: 'match-nmatch',
                    directories: ['CPool'],
                    organization: 'epitech'
                },
                repository: {
                    host: 'git.epitech.eu',
                    url
                }
            })
        })

    })

    describe('owner name', () => {

        it('should match an alphanumeric owner name', () => {
            const url = 'git@git.epitech.eu:/john1.doe@epitech.eu/CPE_bistromatic_2019.git'

            expect(new EpitechSelfHostedDecoder().decode(url)).toStrictEqual({
                ...result,
                repository: {
                    host: 'git.epitech.eu',
                    url
                }
            })
        })

        it('should match an owner name that contains hyphen', () => {
            const url = 'git@git.epitech.eu:/john-john.doe@epitech.eu/CPE_bistromatic_2019.git'

            expect(new EpitechSelfHostedDecoder().decode(url)).toStrictEqual({
                ...result,
                repository: {
                    host: 'git.epitech.eu',
                    url
                }
            })
        })

    })

})
