import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import {
  getRepositorySearchQuery, getRepositorySearchLoading, getRepositorySearchEntities,
  getRepositorySearchError, getRepositorySearchHasTrending
} from '../../shared/store/selectors';
import { SearchAction, LoadTrendingAction, SelectAction } from '../../shared/store/actions/repository.actions';
import { AppError } from '../../shared/model/app-error';
import { Repository } from '../../shared/model/repository';
import { AppRootState } from '../../shared/store/index';


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
  public getRepositories(): Observable<Repository[]> {
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
  public selectRepository(repository: Repository): void {
    this.store.dispatch(new SelectAction(repository));
  }
}
