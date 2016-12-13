import * as repositoryActions from '../actions/repository.actions';
import { Repository } from '../../model/repository';
import { GitHubAPIService } from '../../services/github-api.service';

/**
 * Repository search state
 */
export interface State {
  query: string;
  names: string[];
  loading: boolean;
}

export const initialState: State = {
  query: '',
  names: [],
  loading: false,
};

/**
 * Repository search reducer
 *
 * @param {State} state
 * @param action
 * @returns {any}
 */
export function reducer(state = initialState, action: repositoryActions.Actions): State {
  // console.log('repoSearchReducer()', {state, action});

  switch (action.type) {
    case repositoryActions.ActionTypes.SEARCH:
      const query: string = <string>action.payload;
      // console.log('repoSearchReducer(type=SEARCH)', query);

      if (!GitHubAPIService.isValidSearchQuery(query)) {
        return initialState;
      }

      return Object.assign({}, state, { query, loading: true });

    case repositoryActions.ActionTypes.SEARCH_COMPLETE:
      const repositories = <Repository[]>action.payload;
      // console.log('repoSearchReducer(type=SEARCH_COMPLETE)', repositories);

      // return initialState;
      return {
        query: state.query,
        names: repositories.map((repository: Repository) => repository.full_name),
        loading: false,
      };

    default:
      return state;
  }
}


/**
 * Reducer's selector: get current search query
 * @param state
 */
export const getQuery = (state: State) => state.query;

/**
 * Reducer's selector: get found repository names
 * @param state
 */
export const getNames = (state: State) => state.names;

/**
 * Reducer's selector: get current loading state
 * @param state
 */
export const getLoading = (state: State) => state.loading;
