/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule, Http, ConnectionBackend, RequestOptions, BaseRequestOptions, Response, ResponseOptions,
  RequestMethod
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { repositoriesSearchResultTestData } from '../../../testing/fixtures/search-repositories';
import { repositoryTestData } from '../../../testing/fixtures/repository';
import { repositoryReadmeTestData } from '../../../testing/fixtures/repository-readme';
import { GitHubAPIService } from './github-api.service';
import { Repository } from '../model/repository';
import { Commit } from '../model/commit';
import { repositoryCommitsTestData } from '../../../testing/fixtures/repository-commits';
import { Issue } from '../model/issue';
import { repositoryIssuesTestData } from '../../../testing/fixtures/repository-issues';
import { repositoryPullsTestData } from '../../../testing/fixtures/repository-pulls';
import { PullRequest } from '../model/pull-request';

describe('GitHubAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        {
          provide: Http,
          useFactory: (mockBackend: ConnectionBackend, options: RequestOptions) => {
            return new Http(mockBackend, options);
          },
          deps: [ MockBackend, BaseRequestOptions ]
        },
        MockBackend,
        BaseRequestOptions,
        GitHubAPIService,
      ],
    });
  });

  it('should instantiate', inject([GitHubAPIService], (service: GitHubAPIService) => {
    expect(service).toBeTruthy();
  }));

  it('should retrieve repository', inject([GitHubAPIService, MockBackend], (service: GitHubAPIService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(repositoryTestData)
      })));
    });

    service.retrieveRepository('some/repo').subscribe((repo: Repository) => {
      expect(repo).toBeTruthy();
      expect(repo.name).toBe('bootstrap');
    });
  }));

  it('should retrieve repository commits', inject([GitHubAPIService, MockBackend], (service: GitHubAPIService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(repositoryCommitsTestData)
      })));
    });

    service.retrieveRepositoryCommits('some/repo').subscribe((commits: Commit[]) => {
      expect(commits).toBeTruthy();
      expect(commits.length).toBeGreaterThan(0);

      const commit = <Commit>commits[0];
      expect(commit.sha).toBeTruthy();
    });
  }));

  it('should retrieve repository issues', inject([GitHubAPIService, MockBackend], (service: GitHubAPIService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(repositoryIssuesTestData)
      })));
    });

    service.retrieveRepositoryIssues('some/repo').subscribe((issues: Issue[]) => {
      expect(issues).toBeTruthy();
      expect(issues.length).toBeGreaterThan(0);

      const issue = <Issue>issues[0];
      expect(issue.number).toBeGreaterThan(0);
      expect(issue.title).toContain('ngModel');
      expect(issue.body).toBeTruthy();
    });
  }));

  it('should retrieve repository pulls', inject([GitHubAPIService, MockBackend], (service: GitHubAPIService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(repositoryPullsTestData)
      })));
    });

    service.retrieveRepositoryPulls('some/repo').subscribe((pulls: PullRequest[]) => {
      expect(pulls).toBeTruthy();
      expect(pulls.length).toBeGreaterThan(0);

      const pull = <PullRequest>pulls[0];
      expect(pull.number).toBeGreaterThan(0);
      expect(pull.title).toContain('fix');
      expect(pull.body).toBeTruthy();
    });
  }));

  it('should retrieve repository readme', inject([GitHubAPIService, MockBackend], (service: GitHubAPIService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      if (connection.request.method === RequestMethod.Post) {
        connection.mockRespond(new Response(new ResponseOptions({
          body: '<h1>some rendered markdown</h1>'
        })));
      } else {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(repositoryReadmeTestData)
        })));
      }
    });

    service.retrieveRepositoryReadme('some/repo').subscribe((readme) => {
      expect(readme).toBeTruthy();
      expect(typeof readme).toBe('string');
      expect(readme).toContain('<h1>some rendered markdown</h1>');
    });
  }));

  it('should retrieve repositories', inject([GitHubAPIService, MockBackend], (service: GitHubAPIService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(repositoriesSearchResultTestData)
      })));
    });

    service.retrieveRepositories('bootstrap').subscribe((repos: Repository[]) => {
      expect(repos.length).toBe(3);

      const repo: Repository = repos[0];
      expect(repo.name).toBe('angular.js');
      expect(repo.owner).toBeDefined();
    });
  }));

  it('should retrieve trending repositories', inject([GitHubAPIService, MockBackend], (service: GitHubAPIService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(repositoriesSearchResultTestData)
      })));
    });

    service.retrieveTrendingRepositories().subscribe((repos: Repository[]) => {
      expect(repos.length).toBe(3);

      const repo: Repository = repos[0];
      expect(repo.name).toBe('angular.js');
      expect(repo.owner).toBeDefined();
    });
  }));
});
