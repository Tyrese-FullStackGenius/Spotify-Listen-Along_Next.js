// REF: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
// * note: Reducers are functions that calculate a new state value based on previous state + an action

import {
  LOAD,
  LOGIN_SUCCESS,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_CURRENT_USER,
} from "../../constants/actionTypes.js";

// ================== //
//    SESSION SLICE   //
// ================== //

const initialState = {
  refresh_token: null,
  user: null,
};

export default (state, action) => {
  switch (action.type) {
    case LOAD:
      if (process.browser) {
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = localStorage.getItem("accessToken");
        const expiresIn = localStorage.getItem("expiresIn");

        return Object.assign({}, state, {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn ? +expiresIn : null,
        });
      } else {
        return state;
      }
    case UPDATE_TOKEN_SUCCESS:
      return Object.assign({}, state, { access_token: action.access_token });
    case LOGIN_SUCCESS:
      if (action.refresh_token) {
        return Object.assign({}, state, {
          refresh_token: action.refresh_token,
        });
      }
      return state;
    case UPDATE_CURRENT_USER:
      return Object.assign({}, state, { user: action.user });
    default:
      return state ? state : initialState;
  }
};
