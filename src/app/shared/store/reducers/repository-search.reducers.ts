import * as repositoryActions from '../actions/repository.actions';
import { Repository } from '../../model/repository';
import { GitHubAPIService } from '../../services/github-api.service';

/**
 * Repository search state schema
 */
export interface State {
  query: string;
  ids: string[]; // list of found repositories (their identifiers)
  loading: boolean;
}

export const initialState: State = {
  query: '',
  ids: [],
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
  // console.log('repository-search reducer()', {state, action});

  switch (action.type) {
    case repositoryActions.ActionTypes.SEARCH:
      const query: string = <string>action.payload;
      // console.log('repository-search reducer(SEARCH)', query);

      if (!GitHubAPIService.isValidSearchQuery(query)) {
        return initialState;
      }

      return Object.assign({}, state, { query, loading: true });

    case repositoryActions.ActionTypes.SEARCH_COMPLETE:
      const repositories = <Repository[]>action.payload;
      // console.log('repository-search reducer(type=SEARCH_COMPLETE)', repositories);

      // Note: we only store here list of found ids (so e.g. we know
      // what to display on the search list). Actual repositories
      // are added to the store in the `repository` reducer).
      const foundIds = repositories.map((repository: Repository) => repository.full_name);

      return {
        query: state.query,
        ids: foundIds,
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
 * Reducer's selector: get found repository identifiers
 * @param state
 */
export const getIds = (state: State) => state.ids;

/**
 * Reducer's selector: get current loading state
 * @param state
 */
export const getLoading = (state: State) => state.loading;
