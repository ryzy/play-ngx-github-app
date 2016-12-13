import * as repositoryActions from '../actions/repository.actions';
import { Repository } from '../../model/repository';

/**
 * Repository state schema
 */
export interface State {
  entities: { [identifier: string]: Repository };
  selectedId: string;
}

export const initialState: State = {
  entities: {},
  selectedId: null,
};

/**
 * Repository search reducer
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
    case repositoryActions.ActionTypes.SEARCH_COMPLETE:
      const repositories = <Repository[]>action.payload;
      // console.log('repository reducer(type=LOAD,SEARCH_COMPLETE)', repositories);

      // build Map indexed with repository entities
      // so it can be merged into entities already present in State.entities
      const f = (accumulator: Repository[], current: Repository) => {
        return Object.assign(accumulator, { [current.full_name]: current } );
      };
      const loadedEntities = repositories.reduce(f, {});

      return {
        // add loaded entities to entities already present in state.entities
        entities: Object.assign({}, state.entities, loadedEntities),
        selectedId: state.selectedId,
      };

    case repositoryActions.ActionTypes.SELECT:
      const selectedId: string = <string>action.payload;
      return {
        entities: state.entities,
        selectedId: selectedId,
      };

    default:
      return state;
  }
}


/**
 * Reducer's selector: get entities in store
 * @param state
 */
export const getEntities = (state: State) => state.entities;

/**
 * Reducer's selector: get currently selected repository id
 * @param state
 */
export const getSelectedId = (state: State) => state.selectedId;
