import * as repositoryActions from './actions/repository.actions';
import * as repositorySearch from './reducers/repository-search.reducers';

export interface StoreRootState {
  repositorySearch: repositorySearch.State;
}

export const rootReducer = {
  repositorySearch: repositorySearch.reducer
};
