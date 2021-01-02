// REF: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
// REF: https://redux.js.org/tutorials/fundamentals/part-4-store
// * note: A Redux store runs the root reducer whenever an action is dispatched

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { reducers } from "../ROOT-REDUCER/index.js";

import devicesMiddleware from "../middleware/devicesMiddleware.js";
import loggerMiddleware from "../middleware/loggerMiddleware.js";
import playbackMiddleware from "../middleware/playbackMiddleware";
import searchMiddleware from "../middleware/searchMiddleware.js";
import sessionMiddleware from "../middleware/sessionMiddleware.js";
import socketMiddlewareDefault from "../middleware/socketMiddleware.js";
import { socketMiddleware } from "../middleware/socketMiddleware.js";

import { load } from "../actions/sessionActions.js";

// ================== //
//        STORE       //
// ================== //

export const initStore = (initialState = {}) => {
  const store = createStore(
    // Below is our exported combineReducers() from our Root Reducer
    reducers(),
    initialState,
    applyMiddleware(
      thunk,
      // THUNK is a specific kind of Redux function that can contain asynchronous logic
      // This Redux Thunk middleware modifies the store to let us pass functions into DISPATCH
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
