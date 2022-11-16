/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EpitechGitHubDecoder } from '../epitech-github.decoder.js'

describe('EpitechGitHubDecoder', () => {

    const result = {
        keywords: {
            school: 'epitech',
            project: 'bistromatic'
        },
        project: {
            name: 'bistromatic',
            directories: ['B-CPE-000'],
            organization: 'epitech'
        }
    }

    it('should match the project url', () => {
        const url = 'git@github.com:Epitech/B-CPE-000-CITY-1-1-bistromatic-john.doe.git'

        expect(new EpitechGitHubDecoder().decode(url)).toStrictEqual({
            ...result,
            repository: {
                host: 'github.com',
                url
            }
        })
    })

    it('should not match an url from another code repository server', () => {
        const url = 'git@git.epitech.eu:/john.doe@epitech.eu/CPE_bistromatic_2019'

        expect(new EpitechGitHubDecoder().decode(url)).toBeUndefined()
    })

    it('should match with the https protocol', () => {
        const url = 'https://github.com/Epitech/B-CPE-000-CITY-1-1-bistromatic-john.doe.git'

        expect(new EpitechGitHubDecoder().decode(url)).toStrictEqual({
            ...result,
            repository: {
                host: 'github.com',
                url
            }
        })
    })

    it('should match without the .git suffix', () => {
        const url = 'git@github.com:Epitech/B-CPE-000-CITY-1-1-bistromatic-john.doe'

        expect(new EpitechGitHubDecoder().decode(url)).toStrictEqual({
            ...result,
            repository: {
                host: 'github.com',
                url
            }
        })
    })

    describe('organization name', () => {

        it('should match with a lowercase organization name', () => {
            const url = 'git@github.com:epitech/B-CPE-000-CITY-1-1-bistromatic-john.doe.git'

            expect(new EpitechGitHubDecoder().decode(url)).toStrictEqual({
                ...result,
                repository: {
                    host: 'github.com',
                    url
                }
            })
        })

        it('should match with an uppercase organization name', () => {
            const url = 'git@github.com:EPITECH/B-CPE-000-CITY-1-1-bistromatic-john.doe.git'

            expect(new EpitechGitHubDecoder().decode(url)).toStrictEqual({
                ...result,
                repository: {
                    host: 'github.com',
                    url
                }
            })
        })

        it('should match with an alphanumeric organization name', () => {
            const url = 'git@github.com:Epitech2022/B-CPE-000-CITY-1-1-bistromatic-john.doe.git'

            expect(new EpitechGitHubDecoder().decode(url)).toStrictEqual({
                ...result,
                repository: {
                    host: 'github.com',
                    url
                }
            })
        })

    })

    describe('project name', () => {

        it('should match an uppercase project name', () => {
            const url = 'git@github.com:Epitech/B-CPE-000-CITY-1-1-BSQ-john.doe.git'

            expect(new EpitechGitHubDecoder().decode(url)).toStrictEqual({
                keywords: {
                    school: 'epitech',
                    project: 'bsq'
                },
                project: {
                    name: 'BSQ',
                    directories: ['B-CPE-000'],
                    organization: 'epitech'
                },
                repository: {
                    host: 'github.com',
                    url
                }
            })
        })

        it('should match with an alphanumeric project name', () => {
            const url = 'git@github.com:Epitech/B-CPE-000-CITY-1-1-cpoolday01-john.doe.git'

            expect(new EpitechGitHubDecoder().decode(url)).toStrictEqual({
                keywords: {
                    school: 'epitech',
                    project: 'cpoolday01'
                },
                project: {
                    name: 'cpoolday01',
                    directories: ['B-CPE-000'],
                    organization: 'epitech'
                },
                repository: {
                    host: 'github.com',
                    url
                }
            })
        })

        it('should match a project name that contains underscore', () => {
            const url = 'git@github.com:Epitech/B-CPE-000-CITY-1-1-eval_expr-john.doe.git'

            expect(new EpitechGitHubDecoder().decode(url)).toStrictEqual({
                keywords: {
                    school: 'epitech',
                    project: 'eval_expr'
                },
                project: {
                    name: 'eval_expr',
                    directories: ['B-CPE-000'],
                    organization: 'epitech'
                },
                repository: {
                    host: 'github.com',
                    url
                }
            })
        })

    })

    describe('owner name', () => {

        it('should match an alphanumeric owner name', () => {
            const url = 'git@github.com:Epitech/B-CPE-000-CITY-1-1-bistromatic-john1.doe.git'

            expect(new EpitechGitHubDecoder().decode(url)).toStrictEqual({
                ...result,
                repository: {
                    host: 'github.com',
                    url
                }
            })
        })

        it('should match an owner name that contains hyphen', () => {
            const url = 'git@github.com:Epitech/B-CPE-000-CITY-1-1-bistromatic-john-john.doe.git'

            expect(new EpitechGitHubDecoder().decode(url)).toStrictEqual({
                ...result,
                repository: {
                    host: 'github.com',
                    url
                }
            })
        })

    })

})
