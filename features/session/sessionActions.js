// REF: https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
// * note: Actions in Redux are plain objects with a TYPE field | Actions are the events that occur in the app based on user input + trigger updates in the state
import * as actionTypes from "../../constants/actionTypes.js";

// =============== //
//    SESSION      //
// =============== //
export const load = () => ({ type: actionTypes.LOAD });

export const login = () => ({ type: actionTypes.LOGIN });

export const loginSuccess = () => ({ type: actionTypes.LOGIN_SUCCESS });

export const loginFailure = (refresh_token) => ({
  type: actionTypes.LOGIN_FAILURE,
  refresh_token,
});

export const updateToken = (refreshToken) => ({
  type: actionTypes.UPDATE_TOKEN,
  refreshToken,
});

export const updateTokenSuccess = (access_token) => ({
  type: actionTypes.UPDATE_TOKEN_SUCCESS,
  access_token,
});

export const updateCurrentUser = (user) => ({
  type: actionTypes.UPDATE_CURRENT_USER,
  user,
});
