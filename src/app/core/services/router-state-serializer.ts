import { Injectable } from '@angular/core';
import { RouterStateSerializer } from '@ngrx/router-store';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppRouterState } from '../state/reducers/router';

/**
 * Serialize current router state into something more digestable and suitable for @ngrx Store.
 */
@Injectable()
export class AppRouterStateSerializer implements RouterStateSerializer<AppRouterState> {

  public serialize(routerState: RouterStateSnapshot): AppRouterState {
    let snapshot: ActivatedRouteSnapshot = routerState.root;

    // ActivatedRouteSnapshot has more details (e.g. data field), than RouterStateSnapshot
    // The current one is in the last leaf of `firstChild`.
    do {
      snapshot = snapshot.firstChild || snapshot;
    } while (snapshot.firstChild);

    return {
      url: routerState.url,
      data: snapshot.data,
      fragment: snapshot.fragment,
      queryParams: snapshot.queryParams,
      routeConfig: snapshot.routeConfig || undefined,
    };
  }
}
