import * as repositoryActions from './actions/repository.actions';
import * as repository from './reducers/repository.reducers';
import * as repositorySearch from './reducers/repository-search.reducers';

// Define root store data structure
export interface StoreRootState {
  repository: repository.State;
  repositorySearch: repositorySearch.State;
}

// Create map of root reducers
export const rootReducer = {
  repository: repository.reducer,
  repositorySearch: repositorySearch.reducer,
};
