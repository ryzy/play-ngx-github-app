import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Store } from '@ngrx/store';

import { AppRootState } from '../../core/state/index';
import { GitHubAPIService } from '../../shared/services/github-api.service';
import { Repository } from '../../shared/model/repository';
import { LoadAction, LoadErrorAction } from '../../core/state/repository.actions';
import { getRepositoryEntity } from '../../core/state/selectors';


@Injectable()
export class RepositoryResolve implements Resolve<Repository|undefined> {

  constructor(
    private store: Store<AppRootState>,
    private apiService: GitHubAPIService
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Repository|undefined> {
    const repoName = route.params['owner'] + '/' + route.params['repoName'];

    return this.getRepoFromStore(repoName)
      .take(1)
      .switchMap((repository: Repository) => {
        if (repository) {
          return Observable.of(repository);
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
  public getRepoFromAPI(repoName: string): Observable<Repository|undefined> {
    return this.apiService.retrieveRepository(repoName)
      .do((repository: Repository) => this.store.dispatch(new LoadAction(repository)))
      .catch((error: Response) => {
        this.store.dispatch(new LoadErrorAction(error));
        return Observable.of(undefined);
      })
    ;
  }
}
