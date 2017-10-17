import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as repository from './reducers/repository.reducers';
import * as repositorySearch from './reducers/repository-search.reducers';
import { AppRouterState } from './reducers/router';
import { environment } from '../../../environments/environment';

export interface AppRootState {
  router: RouterReducerState<AppRouterState>;
  repository: repository.State;
  repositorySearch: repositorySearch.State;
}

export const appRootReducers: ActionReducerMap<AppRootState> = {
  router: routerReducer,
  repository: repository.reducer,
  repositorySearch: repositorySearch.reducer,
};

export const appRootInitialState: AppRootState = {
  router: {} as RouterReducerState<AppRouterState>,
  repository: repository.initialState,
  repositorySearch: repositorySearch.initialState,
};

// console.log all actions
export function logger(reducer: ActionReducer<AppRootState>): ActionReducer<AppRootState> {
  return function (state: AppRootState, action: any): AppRootState {
    console.log('[ACTION]', action);
    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppRootState>[] = !environment.production
  ? [
    // logger,
    storeFreeze,
  ] : [];
