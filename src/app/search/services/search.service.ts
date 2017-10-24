import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import {
  getRepositorySearchQuery, getRepositorySearchLoading, getRepositorySearchEntities,
  getRepositorySearchError, getRepositorySearchHasTrending
} from '../../core/state/selectors';
import { SearchAction, LoadTrendingAction, SelectAction } from '../../core/state/repository.actions';
import { AppError } from '../../shared/model/app-error';
import { AppRootState } from '../../core/state/index';
import { RepositoryFragment } from '../../core/queries.types';


@Injectable()
export class SearchService {

  constructor(private store: Store<AppRootState>) {
  }

  /**
   * Get current search query
   */
  public getSearchQuery(): Observable<string|undefined> {
    return this.store.select(getRepositorySearchQuery);
  }

  /**
   * Get current repositories
   */
  public getRepositories(): Observable<RepositoryFragment[]> {
    return this.store.select(getRepositorySearchEntities);
  }

  /**
   * Get error occurred during request (search or load)
   */
  public getError(): Observable<AppError|undefined> {
    return this.store.select(getRepositorySearchError);
  }

  /**
   * Get loading status for search query
   */
  public isLoading(): Observable<boolean> {
    return this.store.select(getRepositorySearchLoading);
  }

  /**
   * Get trending status for currently displayed entities
   */
  public hasTrending(): Observable<boolean> {
    return this.store.select(getRepositorySearchHasTrending);
  }

  /**
   * Perform search action
   * @param query
   */
  public doSearch(query: string): void {
    this.store.dispatch(new SearchAction(query));
  }

  /**
   * Load trending repositories
   */
  public loadTrending(): void {
    this.store.dispatch(new LoadTrendingAction());
  }

  /**
   * Action performed when repository got selected (i.e. clicked)
   * @param repository
   */
  public selectRepository(repository: RepositoryFragment): void {
    this.store.dispatch(new SelectAction(repository));
  }
}
