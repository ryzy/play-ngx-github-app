import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { StoreRootState } from '../../shared/store';
import {
  getRepositorySearchQuery, getRepositorySearchLoading, getRepositorySearchEntities, getRepositorySearchError,
} from '../../shared/store/selectors';
import { SearchAction, LoadTrendingAction } from '../../shared/store/actions/repository.actions';
import { AppError } from '../../shared/model/app-error';
import { Repository } from '../../shared/model/repository';


@Injectable()
export class SearchService {

  constructor(private store: Store<StoreRootState>) {
  }

  /**
   * Get current search query
   * @returns {Observable<string>}
   */
  public getSearchQuery(): Observable<string> {
    return this.store.select(getRepositorySearchQuery);
  }

  /**
   * Get current repositories
   * @returns {Observable<Repository[]>}
   */
  public getRepositories(): Observable<Repository[]> {
    return this.store.select(getRepositorySearchEntities);
  }

  /**
   * Get error occurred during request (search or load)
   * @returns {Observable<error.State>}
   */
  public getError(): Observable<AppError> {
    return this.store.select(getRepositorySearchError);
  }

  /**
   * Get loading status for search query
   * @returns {Observable<boolean>}
   */
  public isLoading(): Observable<boolean> {
    return this.store.select(getRepositorySearchLoading);
  }

  /**
   * Perform search action
   * @param query
   */
  public doSearch(query: string) {
    this.store.dispatch(new SearchAction(query));
  }

  /**
   * Load trending repositories
   */
  public loadTrending() {
    this.store.dispatch(new LoadTrendingAction());
  }
}
