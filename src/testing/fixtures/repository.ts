import { RepositoryFragment } from '../../app/core/queries.types';

/**
 * Sample data returned from
 * GET /repos/:owner/:repo
 */
export const repositoryTestData: RepositoryFragment = {
  id: 'MDEwOlJlcG9zaXRvcnkyNDE5NTMzOQ==',
  name: 'angular',
  nameWithOwner: 'angular/angular',
  description: 'One framework. Mobile & desktop.',
  descriptionHTML: '<div>One framework. Mobile &amp; desktop.</div>',
  createdAt: '2014-09-18T16:12:01Z',
  pushedAt: '2017-10-18T09:52:15Z',
  languages: {
    nodes: [
      {
        name: 'JavaScript',
        color: '#f1e05a'
      }
    ]
  },
  url: 'https://github.com/angular/angular',
  homepageUrl: 'https://angular.io',
  isFork: false,
  forks: {
    totalCount: 7110
  },
  issues: {
    totalCount: 12178
  },
  stargazers: {
    totalCount: 28877
  },
  watchers: {
    totalCount: 2690
  },
  owner: {
    id: 'MDEyOk9yZ2FuaXphdGlvbjEzOTQyNg==',
    login: 'angular',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/139426?v=4',
    url: 'https://github.com/angular',
    __typename: 'Organization'
  }
};
