import { RouterState } from '@ngrx/router-store';
import { createSelector } from 'reselect';

import { StoreRootState } from './index';
import { AppError } from '../model/app-error';
import { Repository } from '../model/repository';
import * as repository from './reducers/repository.reducers';
import * as repositorySearch from './reducers/repository-search.reducers';

//
// Define reducer's selectors to ease selecting state from the root store
//

// repository selectors
export const getRepositoryState = (state: StoreRootState) => state.repository;
export const getRepositoryEntity = createSelector(getRepositoryState, repository.getEntity);

// repositorySearch selectors
export const getRepositorySearchState = (state: StoreRootState) => state.repositorySearch;
export const getRepositorySearchEntities = createSelector(getRepositorySearchState, repositorySearch.getEntities);
export const getRepositorySearchQuery = createSelector(getRepositorySearchState, repositorySearch.getQuery);
export const getRepositorySearchLoading = createSelector(getRepositorySearchState, repositorySearch.getLoading);
export const getRepositorySearchError = createSelector(getRepositorySearchState, repositorySearch.getError);

// router selectors
export const getRouterState = (state: StoreRootState) => state.router;
export const getRouterPath = createSelector(getRouterState, (state: RouterState) => state.path);
