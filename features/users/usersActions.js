// REF: https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
// * note: Actions in Redux are plain objects with a TYPE field | Actions are the events that occur in the app based on user input + trigger updates in the state
import fetch from "isomorphic-unfetch";

import Config from "../../config/app.js";
import * as actionTypes from "../../constants/actionTypes.js";

// =============== //
//     USERS       //
// =============== //
export const updateUsers = (users) => ({
  type: actionTypes.UPDATE_USERS,
  data: users,
});

export const fetchUsers = () => (dispatch) =>
  fetch(`${Config.HOST}/api/users`)
    .then((res) => res.json())
    .then((res) => dispatch(updateUsers(res)));
