import { createSelector } from 'reselect';

import { StoreRootState } from './index';
import * as repositorySearch from './reducers/repository-search.reducers';

//
// Define reducer's selectors to ease selecting state from the root store
//

// repositorySearch selectors
export const getRepositorySearchState = (state: StoreRootState) => state.repositorySearch;
export const getRepositorySearchQuery = createSelector(getRepositorySearchState, repositorySearch.getQuery);
export const getRepositorySearchNames = createSelector(getRepositorySearchState, repositorySearch.getNames);
export const getRepositoryLoading = createSelector(getRepositorySearchState, repositorySearch.getLoading);
