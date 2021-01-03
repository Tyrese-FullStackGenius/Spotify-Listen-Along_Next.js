// REF: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
// * note: Reducers are functions that calculate a new state value based on previous state + an action

import { combineReducers } from "redux";

import devicesReducer, * as fromDevices from "../features/devices/devicesReducer.js";
import playbackReducer from "../features/playback/playbackReducer.js";
import queueReducer from "../features/queue/queueReducer.js";
import searchReducer from "../features/search/searchReducer.js";
import sessionReducer from "../features/session/sessionReducer.js";
import usersReducer from "../features/users/usersReducer.js";

// ================== //
//    ROOT REDUCER    //
// ================== //

export const reducers = () =>
  // pass through an object containing our slice reducers...
  combineReducers({
    queue: queueReducer,
    playback: playbackReducer,
    session: sessionReducer,
    users: usersReducer,
    search: searchReducer,
    devices: devicesReducer,
  });

// getIsFetching + getDevices are methods from devicesReducer.js
export const getDevices = (state) => fromDevices.getDevices(state.devices);

export const getIsFetchingDevices = (state) =>
  fromDevices.getIsFetching(state.devices);
