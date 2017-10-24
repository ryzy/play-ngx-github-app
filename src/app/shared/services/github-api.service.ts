import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { ApolloQueryResult } from 'apollo-client';
import { Apollo } from 'apollo-angular';

import { GITHUB_API_BASE_URL, GITHUB_API_CLIENT_ID, GITHUB_API_CLIENT_SECRET } from '../config';
import { Commit } from '../model/commit';
import { Issue } from '../model/issue';
import { PullRequest } from '../model/pull-request';
import { repositoryDetailsQuery, searchRepositoriesQuery } from '../../core/queries.graphql';
import {
  SearchRepositoriesQuery, RepositoryFragment, SearchRepositoriesQueryVariables, RepositoryDetailsQuery,
} from '../../core/queries.types';

const GITHUB_API_ERROR_README_NOT_FOUND = '<p><b>ERROR:</b> README not found for this repository.</p>';


@Injectable()
export class GitHubAPIService {
  private apiUrl: string = GITHUB_API_BASE_URL;
  private requestOptions: RequestOptionsArgs = {
    search: `client_id=${GITHUB_API_CLIENT_ID}&client_secret=${GITHUB_API_CLIENT_SECRET}`,
  };

  constructor(private http: Http, private apollo: Apollo) { }

  /**
   * Get repository data
   */
  public retrieveRepository(repoFullName: string): Observable<RepositoryFragment|undefined> {
    const [ owner, name ] = repoFullName.split('/');
    if (!(owner && name)) {
      return Observable.of(undefined);
    }

    return this.apollo.watchQuery({
      query: repositoryDetailsQuery,
      variables: { owner, name }
    }).map((r: ApolloQueryResult<RepositoryDetailsQuery>) => {
      return r.data.repository || undefined;
    });
  }

  public retrieveRepositoryCommits(repoFullName: string): Observable<Commit[]> {
    return this.http.get(`${this.apiUrl}/repos/${repoFullName}/commits`, this.requestOptions)
      .map((res: Response) => res.json());
  }

  public retrieveRepositoryIssues(repoFullName: string): Observable<Issue[]> {
    return this.http.get(`${this.apiUrl}/repos/${repoFullName}/issues`, this.requestOptions)
      .map((res: Response) => res.json());
  }

  public retrieveRepositoryPulls(repoFullName: string): Observable<PullRequest[]> {
    return this.http.get(`${this.apiUrl}/repos/${repoFullName}/pulls`, this.requestOptions)
      .map((res: Response) => res.json());
  }

  /**
   * Get repository README content (rendered as HTML)
   * @param repoFullName
   * @returns {Observable<string>}
   */
  public retrieveRepositoryReadme(repoFullName: string): Observable<string> {
    // Seems like there's no easy readme field in new GraphQL API. For now use old API for it.
    return this.http.get(`${this.apiUrl}/repos/${repoFullName}/readme`, this.requestOptions)
      .map((res: Response) => res.json())
      .map((data: { content: string }) => atob(data.content)) // decode base64 encoded README content
      .switchMap((readme: string) => {
        // convert README markdown to HTML
        return this.http.post(`${this.apiUrl}/markdown/raw`, readme, this.requestOptions)
          .map((res: Response) => res.text());
      })
      // GitHub returns 404 Not Found in case repository doesn't have available README content.
      // Catch such errors and return nice README error message instead of just 404.
      .catch((res: Response) => Observable.of(GITHUB_API_ERROR_README_NOT_FOUND))
    ;
  }

  /**
   * Search GitHub repositories by given query
   *
   * @param q: search query, if any. When empty, we simply load so-called "trending" repositories from last `days`
   * @param days
   * @param topic
   */
  public retrieveRepositories(q?: string, days = 30, topic: string = 'angular'): Observable<RepositoryFragment[]> {
    let searchQuery = `created:>${this.getDate(days)} topic:${topic}`;
    if (q) {
      searchQuery = `${encodeURI(q)} topic:${topic}`;
    }

    return this.apollo.watchQuery<SearchRepositoriesQuery>({
      query: searchRepositoriesQuery,
      variables: <SearchRepositoriesQueryVariables>{ searchQuery },
    }).map((r: ApolloQueryResult<SearchRepositoriesQuery>): RepositoryFragment[] => {
      return r.data.search.nodes || [];
    });
  }

  /**
   * Get formatted date for GitHub queries, offsetted by number of days
   *
   * @param {number} offsetDays
   * @returns {string} Date, e.g. 2016-12-31
   */
  private getDate(offsetDays: number): string {
    const offsetDate = new Date(new Date().getTime() - offsetDays * 24 * 3600 * 1000);
    return offsetDate.toISOString().substr(0, 10);
  }
}
