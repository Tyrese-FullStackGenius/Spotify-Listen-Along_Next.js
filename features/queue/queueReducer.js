// REF: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
// * note: Reducers are functions that calculate a new state value based on previous state + an action

import { UPDATE_QUEUE } from "../../constants/actionTypes.js";

// ================== //
//     QUEUE SLICE    //
// ================== //

const initialState = [];

export default (state, action) => {
  switch (action.type) {
    case UPDATE_QUEUE:
      return action.data;
    default:
      return state ? state : initialState;
  }
};
