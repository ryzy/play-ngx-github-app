import { Repository } from '../../app/shared/model/repository';
import { Owner } from '../../app/shared/model/owner';

/**
 * Sample data returned from
 * GET /repos/:owner/:repo
 */
export const repositoryTestData = <Repository>{
  id: 2126244,
  name: 'bootstrap',
  full_name: 'twbs/bootstrap',
  owner: <Owner>{
    login: 'twbs',
    id: 2918581,
    avatar_url: 'https://avatars.githubusercontent.com/u/2918581?v=3',
    html_url: 'https://github.com/twbs',
    starred_url: 'https://api.github.com/users/twbs/starred{/owner}{/repo}',
    repos_url: 'https://api.github.com/users/twbs/repos',
    type: 'Organization',
  },
  html_url: 'https://github.com/twbs/bootstrap',
  description: 'The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.',
  fork: false,
  issues_url: 'https://api.github.com/repos/twbs/bootstrap/issues{/number}',
  created_at: '2011-07-29T21:19:00Z',
  updated_at: '2016-12-14T16:21:38Z',
  pushed_at: '2016-12-14T13:31:16Z',
  ssh_url: 'git@github.com:twbs/bootstrap.git',
  clone_url: 'https://github.com/twbs/bootstrap.git',
  homepage: 'http://getbootstrap.com',
  size: 217052,
  stargazers_count: 104518,
  subscribers_count: 666,
  language: 'JavaScript',
  has_issues: true,
  open_issues: 300,
  forks: 47430,
};
