// REF: https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
// * note: Actions in Redux are plain objects with a TYPE field | Actions are the events that occur in the app based on user input + trigger updates in the state
import * as types from "../constants/ActionTypes.js";

// =============== //
//     VOTING      //
// =============== //
export const voteUp = (id) => ({
  type: types.VOTE_UP,
  id,
});

export const voteUpSuccess = () => ({
  type: types.VOTE_UP_SUCCESS,
});
