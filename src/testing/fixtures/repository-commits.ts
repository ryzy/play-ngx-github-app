/* tslint:disable:max-line-length */

/**
 * Sample data returned from
 * GET /repos/:owner/:repo/commits
 */
export const repositoryCommitsTestData = [
  {
    sha: '0e3981afc17b9fbc302b59397037b71715afdd28',
    commit: {
      author: {
        name: 'Chuck Jazdzewski',
        email: 'chuckj@google.com',
        date: '2016-12-16T23:33:47Z'
      },
      committer: {
        name: 'GitHub',
        email: 'noreply@github.com',
        date: '2016-12-16T23:33:47Z'
      },
      message: 'fix(compiler-cli): produce metadata for .d.ts files without metadata (#13526)\n\nFixes #13307\r\nFixes #13473\r\nFixes #13521',
      tree: {
        sha: '6715c9cdd5b55b92c294d78d5fe1992bbc792501',
        url: 'https://api.github.com/repos/angular/angular/git/trees/6715c9cdd5b55b92c294d78d5fe1992bbc792501'
      },
      url: 'https://api.github.com/repos/angular/angular/git/commits/0e3981afc17b9fbc302b59397037b71715afdd28',
      comment_count: 0
    },
    url: 'https://api.github.com/repos/angular/angular/commits/0e3981afc17b9fbc302b59397037b71715afdd28',
    html_url: 'https://github.com/angular/angular/commit/0e3981afc17b9fbc302b59397037b71715afdd28',
    comments_url: 'https://api.github.com/repos/angular/angular/commits/0e3981afc17b9fbc302b59397037b71715afdd28/comments',
    author: {
      login: 'chuckjaz',
      id: 372013,
      avatar_url: 'https://avatars.githubusercontent.com/u/372013?v=3',
      gravatar_id: '',
      url: 'https://api.github.com/users/chuckjaz',
      html_url: 'https://github.com/chuckjaz',
      followers_url: 'https://api.github.com/users/chuckjaz/followers',
      following_url: 'https://api.github.com/users/chuckjaz/following{/other_user}',
      gists_url: 'https://api.github.com/users/chuckjaz/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/chuckjaz/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/chuckjaz/subscriptions',
      organizations_url: 'https://api.github.com/users/chuckjaz/orgs',
      repos_url: 'https://api.github.com/users/chuckjaz/repos',
      events_url: 'https://api.github.com/users/chuckjaz/events{/privacy}',
      received_events_url: 'https://api.github.com/users/chuckjaz/received_events',
      type: 'User',
      site_admin: false
    },
    committer: {
      login: 'web-flow',
      id: 19864447,
      avatar_url: 'https://avatars.githubusercontent.com/u/19864447?v=3',
      gravatar_id: '',
      url: 'https://api.github.com/users/web-flow',
      html_url: 'https://github.com/web-flow',
      followers_url: 'https://api.github.com/users/web-flow/followers',
      following_url: 'https://api.github.com/users/web-flow/following{/other_user}',
      gists_url: 'https://api.github.com/users/web-flow/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/web-flow/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/web-flow/subscriptions',
      organizations_url: 'https://api.github.com/users/web-flow/orgs',
      repos_url: 'https://api.github.com/users/web-flow/repos',
      events_url: 'https://api.github.com/users/web-flow/events{/privacy}',
      received_events_url: 'https://api.github.com/users/web-flow/received_events',
      type: 'User',
      site_admin: false
    },
    parents: [
      {
        sha: 'e78508507d3d4ba724de6b85e901060bbf2cecb2',
        url: 'https://api.github.com/repos/angular/angular/commits/e78508507d3d4ba724de6b85e901060bbf2cecb2',
        html_url: 'https://github.com/angular/angular/commit/e78508507d3d4ba724de6b85e901060bbf2cecb2'
      }
    ]
  },
  {
    sha: 'e78508507d3d4ba724de6b85e901060bbf2cecb2',
    commit: {
      author: {
        name: 'Victor Berchet',
        email: 'victor@suumit.com',
        date: '2016-12-16T23:33:16Z'
      },
      committer: {
        name: 'Chuck Jazdzewski',
        email: 'chuckj@google.com',
        date: '2016-12-16T23:33:16Z'
      },
      message: 'fix(compiler): do not lex `}}` when interpolation is disabled (#13531)\n\n* doc(compiler): fix the ICU expander API docs\r\n\r\n* test(compiler): add lexer and parser specs\r\n\r\n* fix(compiler): do not lex `}}` when interpolation is disabled\r\n\r\nfix #13525',
      tree: {
        sha: '0450fd2b6a5744ca61d97365ff974b104684737a',
        url: 'https://api.github.com/repos/angular/angular/git/trees/0450fd2b6a5744ca61d97365ff974b104684737a'
      },
      url: 'https://api.github.com/repos/angular/angular/git/commits/e78508507d3d4ba724de6b85e901060bbf2cecb2',
      comment_count: 0
    },
    url: 'https://api.github.com/repos/angular/angular/commits/e78508507d3d4ba724de6b85e901060bbf2cecb2',
    html_url: 'https://github.com/angular/angular/commit/e78508507d3d4ba724de6b85e901060bbf2cecb2',
    comments_url: 'https://api.github.com/repos/angular/angular/commits/e78508507d3d4ba724de6b85e901060bbf2cecb2/comments',
    author: {
      login: 'vicb',
      id: 248818,
      avatar_url: 'https://avatars.githubusercontent.com/u/248818?v=3',
      gravatar_id: '',
      url: 'https://api.github.com/users/vicb',
      html_url: 'https://github.com/vicb',
      followers_url: 'https://api.github.com/users/vicb/followers',
      following_url: 'https://api.github.com/users/vicb/following{/other_user}',
      gists_url: 'https://api.github.com/users/vicb/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/vicb/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/vicb/subscriptions',
      organizations_url: 'https://api.github.com/users/vicb/orgs',
      repos_url: 'https://api.github.com/users/vicb/repos',
      events_url: 'https://api.github.com/users/vicb/events{/privacy}',
      received_events_url: 'https://api.github.com/users/vicb/received_events',
      type: 'User',
      site_admin: false
    },
    committer: {
      login: 'chuckjaz',
      id: 372013,
      avatar_url: 'https://avatars.githubusercontent.com/u/372013?v=3',
      gravatar_id: '',
      url: 'https://api.github.com/users/chuckjaz',
      html_url: 'https://github.com/chuckjaz',
      followers_url: 'https://api.github.com/users/chuckjaz/followers',
      following_url: 'https://api.github.com/users/chuckjaz/following{/other_user}',
      gists_url: 'https://api.github.com/users/chuckjaz/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/chuckjaz/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/chuckjaz/subscriptions',
      organizations_url: 'https://api.github.com/users/chuckjaz/orgs',
      repos_url: 'https://api.github.com/users/chuckjaz/repos',
      events_url: 'https://api.github.com/users/chuckjaz/events{/privacy}',
      received_events_url: 'https://api.github.com/users/chuckjaz/received_events',
      type: 'User',
      site_admin: false
    },
    parents: [
      {
        sha: 'a23fa94ca8b5f30b91835f9b2002c52ed970143a',
        url: 'https://api.github.com/repos/angular/angular/commits/a23fa94ca8b5f30b91835f9b2002c52ed970143a',
        html_url: 'https://github.com/angular/angular/commit/a23fa94ca8b5f30b91835f9b2002c52ed970143a'
      }
    ]
  },
  {
    sha: 'a23fa94ca8b5f30b91835f9b2002c52ed970143a',
    commit: {
      author: {
        name: 'Brandon',
        email: 'aboveyou00@users.noreply.github.com',
        date: '2016-12-16T23:24:26Z'
      },
      committer: {
        name: 'Chuck Jazdzewski',
        email: 'chuckj@google.com',
        date: '2016-12-16T23:24:26Z'
      },
      message: 'fix(common): capitalize first letter of all words in TitleCasePipe (#13511)',
      tree: {
        sha: '88e9cc07daae88d905927c32183b8d8a579330c5',
        url: 'https://api.github.com/repos/angular/angular/git/trees/88e9cc07daae88d905927c32183b8d8a579330c5'
      },
      url: 'https://api.github.com/repos/angular/angular/git/commits/a23fa94ca8b5f30b91835f9b2002c52ed970143a',
      comment_count: 0
    },
    url: 'https://api.github.com/repos/angular/angular/commits/a23fa94ca8b5f30b91835f9b2002c52ed970143a',
    html_url: 'https://github.com/angular/angular/commit/a23fa94ca8b5f30b91835f9b2002c52ed970143a',
    comments_url: 'https://api.github.com/repos/angular/angular/commits/a23fa94ca8b5f30b91835f9b2002c52ed970143a/comments',
    author: {
      login: 'aboveyou00',
      id: 3201149,
      avatar_url: 'https://avatars.githubusercontent.com/u/3201149?v=3',
      gravatar_id: '',
      url: 'https://api.github.com/users/aboveyou00',
      html_url: 'https://github.com/aboveyou00',
      followers_url: 'https://api.github.com/users/aboveyou00/followers',
      following_url: 'https://api.github.com/users/aboveyou00/following{/other_user}',
      gists_url: 'https://api.github.com/users/aboveyou00/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/aboveyou00/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/aboveyou00/subscriptions',
      organizations_url: 'https://api.github.com/users/aboveyou00/orgs',
      repos_url: 'https://api.github.com/users/aboveyou00/repos',
      events_url: 'https://api.github.com/users/aboveyou00/events{/privacy}',
      received_events_url: 'https://api.github.com/users/aboveyou00/received_events',
      type: 'User',
      site_admin: false
    },
    committer: {
      login: 'chuckjaz',
      id: 372013,
      avatar_url: 'https://avatars.githubusercontent.com/u/372013?v=3',
      gravatar_id: '',
      url: 'https://api.github.com/users/chuckjaz',
      html_url: 'https://github.com/chuckjaz',
      followers_url: 'https://api.github.com/users/chuckjaz/followers',
      following_url: 'https://api.github.com/users/chuckjaz/following{/other_user}',
      gists_url: 'https://api.github.com/users/chuckjaz/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/chuckjaz/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/chuckjaz/subscriptions',
      organizations_url: 'https://api.github.com/users/chuckjaz/orgs',
      repos_url: 'https://api.github.com/users/chuckjaz/repos',
      events_url: 'https://api.github.com/users/chuckjaz/events{/privacy}',
      received_events_url: 'https://api.github.com/users/chuckjaz/received_events',
      type: 'User',
      site_admin: false
    },
    parents: [
      {
        sha: '4568d5ddac879205ad8f9f2769dd1add23b13884',
        url: 'https://api.github.com/repos/angular/angular/commits/4568d5ddac879205ad8f9f2769dd1add23b13884',
        html_url: 'https://github.com/angular/angular/commit/4568d5ddac879205ad8f9f2769dd1add23b13884'
      }
    ]
  }
];
