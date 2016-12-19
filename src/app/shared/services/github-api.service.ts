import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/cache';
import 'rxjs/add/operator/switchMap';

import { GITHUB_API_BASE_URL } from '../config';
import { Repository } from '../model/repository';
import { Commit } from '../model/commit';
import { Issue } from '../model/issue';
import { PullRequest } from '../model/pull-request';

// const requestOptions = {search: 'client_id=550a2799cf7516968ffb&client_secret=2fd4923d61ed0d53aedcf131b5280a1a1d2ece13'};
const requestOptions = {};

@Injectable()
export class GitHubAPIService {
  private apiUrl: string = GITHUB_API_BASE_URL;

  constructor(private http: Http) {}

  /**
   * Get repository data
   * @param repoFullName
   * @returns {Observable<Repository>}
   */
  public retrieveRepository(repoFullName: string): Observable<Repository> {
    return this.http.get(`${this.apiUrl}/repos/${repoFullName}`, requestOptions)
      .map((res: Response) => res.json());
  }

  public retrieveRepositoryCommits(repoFullName: string): Observable<Commit[]> {
    return this.http.get(`${this.apiUrl}/repos/${repoFullName}/commits`, requestOptions)
      .map((res: Response) => res.json());
  }

  public retrieveRepositoryIssues(repoFullName: string): Observable<Issue[]> {
    return this.http.get(`${this.apiUrl}/repos/${repoFullName}/issues`, requestOptions)
      .map((res: Response) => res.json());
  }

  public retrieveRepositoryPulls(repoFullName: string): Observable<PullRequest[]> {
    return this.http.get(`${this.apiUrl}/repos/${repoFullName}/pulls`, requestOptions)
      .map((res: Response) => res.json());
  }

  /**
   * Get repository README content (rendered as HTML)
   * @param repoFullName
   * @returns {Observable<string>}
   */
  public retrieveRepositoryReadme(repoFullName: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/repos/${repoFullName}/readme`, requestOptions)
      .map((res: Response) => res.json())
      .map((data: { content: string }) => atob(data.content)) // decode base64 encoded README content
      .switchMap((readme: string) => {
        // convert README markdown to HTML
        return this.http.post(`${this.apiUrl}/markdown/raw`, readme, requestOptions)
          .map((res: Response) => res.text());
      })
      ;
  }

  /**
   * Search GitHub repositories by given query
   *
   * @param {string} q: search query
   * @returns {Observable<Repository[]>}
   */
  public retrieveRepositories(q: string): Observable<Repository[]> {
    const url = `${this.apiUrl}/search/repositories?q=${q}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .map((searchData: { items: Repository[] }) => searchData.items);
  }

  /**
   * Get trending repositories in the last X days
   *
   * @param {number} days
   * @param {string} language
   * @returns {Observable<Repository[]>}
   */
  public retrieveTrendingRepositories(days = 30, language = 'JavaScript'): Observable<Repository[]> {
    const q = `created:>${this.getDate(days)} language:${language}`;
    const url = `${this.apiUrl}/search/repositories?q=${q}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .map((searchData: { items: Repository[] }) => searchData.items)
      .cache()
    ;
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
