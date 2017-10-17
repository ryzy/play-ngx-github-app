import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppRootState } from '../../core/state/index';
import { Repository } from '../../shared/model/repository';
import {
  getRepositoryEntity, getRepositoryError, getRepositoryReadme,
  getRepositoryIssues, getRepositoryCommits, getRepositoryPulls
} from '../../core/state/selectors';
import { AppError } from '../../shared/model/app-error';
import {
  LoadReadmeAction, LoadIssuesAction, LoadCommitsAction,
  LoadPullsAction
} from '../../core/state/repository.actions';
import { Issue } from '../../shared/model/issue';
import { Commit } from '../../shared/model/commit';
import { PullRequest } from '../../shared/model/pull-request';


@Injectable()
export class RepositoryService {

  public constructor(
    private store: Store<AppRootState>
  ) { }

  /**
   * Get currently selected repository
   */
  public getRepository(): Observable<Repository|undefined> {
    return this.store.select(getRepositoryEntity);
  }

  /**
   * Get error occurred during loading the repository
   */
  public getError(): Observable<AppError|undefined> {
    return this.store.select(getRepositoryError);
  }

  /**
   * Get repository Commit items
   *
   * @param {Repository} repository
   * @param {boolean} dispatch: flag indicating that a load action should be dispatched.
   *                            Should be set to true when we want to trigger fetching new data to store.
   * @returns {Observable}
   */
  public getCommits(repository: Repository, dispatch = false): Observable<Commit[]> {
    if (dispatch) {
      this.store.dispatch(new LoadCommitsAction(repository));
    }
    return this.store.select(getRepositoryCommits);
  }

  /**
   * Get repository Issue items
   *
   * @param {Repository} repository
   * @param {boolean} dispatch: flag indicating that a load action should be dispatched.
   *                            Should be set to true when we want to trigger fetching new data to store.
   * @returns {Observable}
   */
  public getIssues(repository: Repository, dispatch = false): Observable<Issue[]> {
    if (dispatch) {
      this.store.dispatch(new LoadIssuesAction(repository));
    }
    return this.store.select(getRepositoryIssues);
  }

  /**
   * Get repository PullRequest items
   *
   * @param {Repository} repository
   * @param {boolean} dispatch: flag indicating that a load action should be dispatched.
   *                            Should be set to true when we want to trigger fetching new data to store.
   * @returns {Observable}
   */
  public getPulls(repository: Repository, dispatch = false): Observable<PullRequest[]> {
    if (dispatch) {
      this.store.dispatch(new LoadPullsAction(repository));
    }
    return this.store.select(getRepositoryPulls);
  }

  /**
   * Get repository readme content
   *
   * @param {Repository} repository
   * @param {boolean} dispatch: flag indicating that a load action should be dispatched.
   *                            Should be set to true when we want to trigger fetching new data to store.
   * @returns {Observable}
   */
  public getReadme(repository: Repository, dispatch = false): Observable<string|undefined> {
    if (dispatch) {
      this.store.dispatch(new LoadReadmeAction(repository));
    }
    return this.store.select(getRepositoryReadme);
  }
}
