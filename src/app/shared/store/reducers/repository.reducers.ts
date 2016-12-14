import * as repositoryActions from '../actions/repository.actions';
import { Repository } from '../../model/repository';

/**
 * Repository state schema
 */
export interface State {
  entity: Repository; // currently loaded/displayed repository
}

export const initialState: State = {
  entity: null,
};

/**
 * Repository reducer
 *
 * @param {State} state
 * @param action
 * @returns {any}
 */
export function reducer(state = initialState, action: repositoryActions.Actions): State {
  // console.log('repository reducer()', {state, action});

  switch (action.type) {
    /**
     * Called with repositories found from search
     * or when repository data got loaded on request
     */
    case repositoryActions.ActionTypes.LOAD:
      return {
        entity: <Repository>action.payload,
      };

    default:
      return state;
  }
}


/**
 * Reducer's selector: get entities in store
 * @param state
 */
export const getEntity = (state: State) => state.entity;
