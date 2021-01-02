// REF: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
// * note: Reducers are functions that calculate a new state value based on previous state + an action

import {
  SEARCH_TRACKS,
  SEARCH_TRACKS_SUCCESS,
  SEARCH_TRACKS_RESET,
} from "../../constants/actionTypes.js";

// ================== //
//    SEARCH SLICE    //
// ================== //

const initialState = {};

export default (state, action) => {
  switch (action.type) {
    case SEARCH_TRACKS:
      return { query: action.query };
    case SEARCH_TRACKS_SUCCESS:
      if (state.query === action.query) {
        return {
          query: action.query,
          results: action.results,
        };
      } else {
        return state;
      }
    case SEARCH_TRACKS_RESET:
      return initialState;

    default:
      return state ? state : initialState;
  }
};
