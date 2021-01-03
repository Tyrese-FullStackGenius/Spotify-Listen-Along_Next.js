// REF: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
// REF: https://redux.js.org/tutorials/fundamentals/part-4-store
// * note: A Redux store runs the root reducer whenever an action is dispatched

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// THUNK is a specific kind of Redux function that can contain asynchronous logic
// This Redux Thunk middleware modifies the store to let us pass functions into DISPATCH

import { reducers } from "../ROOT-REDUCER/index.js";

import devicesMiddleware from "../features/devices/devicesMiddleware.js";
import loggerMiddleware from "../features/logger/loggerMiddleware.js";
import playbackMiddleware from "../features/playback/playbackMiddleware.js";
import searchMiddleware from "../features/search/searchMiddleware.js";
import sessionMiddleware from "../features/session/sessionMiddleware.js";
import socketMiddlewareDefault from "../features/sockets/socketsMiddleware.js";
import { socketMiddleware } from "../features/sockets/socketsMiddleware.js";

import { load } from "../features/session/sessionActions.js";

// ================== //
//        STORE       //
// ================== //

export const initStore = (initialState = {}) => {
  const store = createStore(
    reducers(),
    initialState,
    applyMiddleware(
      thunk,
      devicesMiddleware,
      loggerMiddleware,
      playbackMiddleware,
      searchMiddleware,
      sessionMiddleware,
      socketMiddleware
    )
  );
  socketMiddlewareDefault(store);
  store.dispatch(load());
  return store;
};
