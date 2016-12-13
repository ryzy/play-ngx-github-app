import { createSelector } from 'reselect';

import { StoreRootState } from './index';
import { Repository } from '../model/repository';
import * as repository from './reducers/repository.reducers';
import * as repositorySearch from './reducers/repository-search.reducers';

//
// Define reducer's selectors to ease selecting state from the root store
//

// repository selectors
export const getRepositoryState = (state: StoreRootState) => state.repository;
export const getRepositoryEntities = createSelector(getRepositoryState, repository.getEntities);
export const getRepositorySelectedId = createSelector(getRepositoryState, repository.getEntities);

// repositorySearch selectors
export const getRepositorySearchState = (state: StoreRootState) => state.repositorySearch;
export const getRepositorySearchQuery = createSelector(getRepositorySearchState, repositorySearch.getQuery);
export const getRepositorySearchIds = createSelector(getRepositorySearchState, repositorySearch.getIds);
export const getRepositorySearchLoading = createSelector(getRepositorySearchState, repositorySearch.getLoading);
