// REF: https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
// * note: Actions in Redux are plain objects with a TYPE field | Actions are the events that occur in the app based on user input + trigger updates in the state
import * as actionTypes from "../../constants/actionTypes.js";

// =============== //
//     VOTING      //
// =============== //
export const voteUp = (id) => ({
  type: actionTypes.VOTE_UP,
  id,
});

export const voteUpSuccess = () => ({
  type: actionTypes.VOTE_UP_SUCCESS,
});
