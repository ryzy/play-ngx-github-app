import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { AppRouterState, RouterFeatureStoreName } from './router';

const getState: MemoizedSelector<object, RouterReducerState<AppRouterState>>
  = createFeatureSelector<RouterReducerState<AppRouterState>>(RouterFeatureStoreName);

export const getRouterState: MemoizedSelector<RouterReducerState<AppRouterState>, AppRouterState|undefined>
  = createSelector(getState, (state: RouterReducerState<AppRouterState>) => state && state.state);
