// REF: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
// REF: https://developer.spotify.com/documentation/web-api/guides/using-connect-web-api/
// * note: Reducers are functions that calculate a new state value based on previous state + an action

import {
  FETCH_AVAILABLE_DEVICES,
  FETCH_AVAILABLE_DEVICES_ERROR,
  FETCH_AVAILABLE_DEVICES_SUCCESS,
} from "../../constants/actionTypes.js";

// ================== //
//    DEVICES SLICE   //
// ================== //

const initialState = {
  isFetching: false,
  data: [],
};

export default (state, action) => {
  switch (action.type) {
    case FETCH_AVAILABLE_DEVICES:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_AVAILABLE_DEVICES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.list,
      };
    case FETCH_AVAILABLE_DEVICES_ERROR:
      return initialState;
    default:
      return state ? state : initialState;
  }
};

export const getIsFetching = (state) => {
  return state.isFetching;
};

export const getDevices = (state) => {
  return state.data;
};
