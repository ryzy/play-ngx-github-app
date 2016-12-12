/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, ConnectionBackend, RequestOptions, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { GitHubAPIService } from './github-api.service';
import { Repository } from '../model/repository';

const mockRepositorySearchResponse = {
  items: [
    { id: 0, name: 'Repo 1', owner: { name: 'User 1' } },
    { id: 1, name: 'Repo 2', owner: { name: 'User 2' }  },
    { id: 2, name: 'Repo 3', owner: { name: 'User 1' }  },
  ]
};

describe('GitHubAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        {
          provide: Http,
          useFactory: (mockBackend: ConnectionBackend, options: RequestOptions) => {
            return new Http(mockBackend, options)
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

  it('should retrieve repositories', inject([GitHubAPIService, MockBackend], (service: GitHubAPIService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockRepositorySearchResponse)
      })));
    });

    service.retrieveRepositories('bootstrap').subscribe((repos: Repository[]) => {
      expect(repos.length).toBe(3);

      const repo: Repository = repos[0];
      expect(repo.name).toBe('Repo 1');
      expect(repo.owner).toBeDefined();
    });
  }));

  it('should retrieve trending repositories', inject([GitHubAPIService, MockBackend], (service: GitHubAPIService, mockBackend: MockBackend) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockRepositorySearchResponse)
      })));
    });

    service.retrieveTrendingRepositories().subscribe((repos: Repository[]) => {
      expect(repos.length).toBe(3);

      const repo: Repository = repos[0];
      expect(repo.name).toBe('Repo 1');
      expect(repo.owner).toBeDefined();
    });
  }));
});
