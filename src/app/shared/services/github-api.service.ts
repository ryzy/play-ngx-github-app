import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { GITHUB_API_BASE_URL } from '../config';
import { Repository } from '../model/repository';

@Injectable()
export class GitHubAPIService {
  private apiUrl: string = GITHUB_API_BASE_URL;

  constructor(private http: Http) { }

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
  public retrieveTrendingRepositories(days = 7, language = 'JavaScript'): Observable<Repository[]> {
    const q = `created:>${this.getDate(days)} language:${language}`;
    const url = `${this.apiUrl}/search/repositories?q=${q}`;
    return this.http.get(url)
      .map((res: Response) => res.json())
      .map((searchData: { items: Repository[] }) => searchData.items);
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
