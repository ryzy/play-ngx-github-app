import { compose } from '@ngrx/core';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';
// storeFreeze prevents state from being mutated. When mutation occurs, an
// exception will be thrown. This is useful during development mode to
// ensure that none of the reducers accidentally mutates the state.
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../../environments/environment';
import * as repositoryActions from './actions/repository.actions';
import * as repository from './reducers/repository.reducers';
import * as repositorySearch from './reducers/repository-search.reducers';

// Define root store data structure
export interface StoreRootState {
  repository: repository.State;
  repositorySearch: repositorySearch.State;
  router: RouterState;
}

export const storeRootInitialState = {
  router: {
    'path': '/',
  }
};

// Create map of root reducers
const reducers = {
  repository: repository.reducer,
  repositorySearch: repositorySearch.reducer,
  router: routerReducer,
};


const developmentReducer: ActionReducer<StoreRootState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<StoreRootState> = combineReducers(reducers);

export function rootReducer(state: StoreRootState, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}
