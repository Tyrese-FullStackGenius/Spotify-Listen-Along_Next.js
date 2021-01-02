// REF: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
// * note: Reducers are functions that calculate a new state value based on previous state + an action

import { UPDATE_USERS } from "../../constants/actionTypes.js";

// ================== //
//     USERS SLICE    //
// ================== //

const initialState = [
  {
    id: "something",
    name: "Jenna",
  },
  {
    id: "something",
    name: "Nate",
  },
  {
    id: "something",
    name: "Grant",
  },
  {
    id: "something",
    name: "Kirsten",
  },
];

export default (state, action) => {
  switch (action.type) {
    case UPDATE_USERS:
      return action.data;
    default:
      return state ? state : initialState;
  }
};
