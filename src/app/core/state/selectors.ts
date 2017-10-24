import { createSelector } from '@ngrx/store';

import { AppRootState } from './index';
import { AppError } from '../../shared/model/app-error';
import { Commit } from '../../shared/model/commit';
import { Issue } from '../../shared/model/issue';
import { PullRequest } from '../../shared/model/pull-request';
import { RepositoryFragment } from '../queries.types';
import * as repository from './reducers/repository.reducers';
import * as repositorySearch from './reducers/repository-search.reducers';
import { AppRouterState } from './reducers/router';


//
// Define reducer's selectors to ease selecting state from the root store
//

// repositorySearch selectors
export const getRepositorySearchState = (state: AppRootState) => state.repositorySearch;
export const getRepositorySearchEntities = createSelector(getRepositorySearchState, repositorySearch.getEntities);
export const getRepositorySearchQuery = createSelector(getRepositorySearchState, repositorySearch.getQuery);
export const getRepositorySearchLoading = createSelector(getRepositorySearchState, repositorySearch.getLoading);
export const getRepositorySearchHasTrending = createSelector(getRepositorySearchState, repositorySearch.getTrending);
export const getRepositorySearchError = createSelector(getRepositorySearchState, repositorySearch.getError);

// repository selectors
export const getRepositoryState = (state: AppRootState) => state.repository;
export const getRepositoryEntity = createSelector(getRepositoryState, repository.getEntity);
export const getRepositoryError = createSelector(getRepositoryState, repository.getError);
export const getRepositoryLoading = createSelector(getRepositoryState, repository.getLoading);
export const getRepositoryCommits = createSelector(getRepositoryState, repository.getCommits);
export const getRepositoryIssues = createSelector(getRepositoryState, repository.getIssues);
export const getRepositoryPulls = createSelector(getRepositoryState, repository.getPulls);
export const getRepositoryReadme = createSelector(getRepositoryState, repository.getReadme);

// router selectors
export const getRouterState = (state: AppRootState) => state.router && state.router.state;
export const getRouterPath = createSelector(getRouterState, (state: AppRouterState) => state && state.url);
