import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { StoreRootState } from '../../shared/store/index';
import { GitHubAPIService } from '../../shared/services/github-api.service';
import { Repository } from '../../shared/model/repository';
import { LoadAction, LoadErrorAction } from '../../shared/store/actions/repository.actions';
import { getRepositoryEntity } from '../../shared/store/selectors';


@Injectable()
export class RepositoryResolve implements Resolve<Repository> {

  constructor(
    private store: Store<StoreRootState>,
    private apiService: GitHubAPIService
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Repository> {
    const repoName = route.params['owner'] + '/' + route.params['repoName'];

    return this.getRepoFromStore(repoName)
      .take(1)
      .switchMap((repository: Repository) => {
        if (repository) {
          return of(repository);
        }

        return this.getRepoFromAPI(repoName);
      })
    ;
  }

  /**
   * Get requested repository from the store (if available)
   */
  public getRepoFromStore(repoName: string): Observable<Repository|boolean> {
    return this.store.select(getRepositoryEntity)
      .map((repository: Repository) => {
        return repository && repository.full_name === repoName ? repository : false;
      })
    ;
  }

  /**
   * Get requested repository from GitHub API
   */
  public getRepoFromAPI(repoName: string): Observable<Repository|boolean> {
    return this.apiService.retrieveRepository(repoName)
      .do((repository: Repository) => this.store.dispatch(new LoadAction(repository)))
      .catch((error: Response) => {
        this.store.dispatch(new LoadErrorAction(error));
        return of(false);
      })
    ;
  }
}
