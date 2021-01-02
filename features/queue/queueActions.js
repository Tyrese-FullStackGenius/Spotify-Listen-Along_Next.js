// REF: https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
// * note: Actions in Redux are plain objects with a TYPE field | Actions are the events that occur in the app based on user input + trigger updates in the state
import fetch from "isomorphic-unfetch";

import Config from "../../config/app.js";
import * as types from "../../constants/actionTypes.js";

// =============== //
//      QUEUE      //
// =============== //
export const queueTrack = (id) => ({ type: types.QUEUE_TRACK, id });

export const updateQueue = (queue) => ({
  type: types.UPDATE_QUEUE,
  data: queue,
});

export const queueEnded = () => ({ type: types.QUEUE_ENDED });

export const queueRemoveTrack = (id) => ({
  type: types.QUEUE_REMOVE_TRACK,
  id,
});

export const fetchQueue = () => (dispatch) =>
  fetch(`${Config.HOST}/api/queue`)
    .then((res) => res.json())
    .then((res) => dispatch(updateQueue(res)));
