// REF: https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
// * note: Actions in Redux are plain objects with a TYPE field | Actions are the events that occur in the app based on user input + trigger updates in the state
import * as actionTypes from "../../constants/actionTypes.js";

// =============== //
//     SEARCH      //
// =============== //
export const searchTracks = (query) => ({
  type: actionTypes.SEARCH_TRACKS,
  query,
});

export const searchTracksSuccess = (query, results) => ({
  types: actionTypes.SEARCH_TRACKS_SUCCESS,
  query,
  results,
});

export const searchTracksReset = () => ({
  type: actionTypes.SEARCH_TRACKS_RESET,
});

// =============== //
//      FETCH      //
// =============== //
export const fetchTrack = (id) => ({ type: actionTypes.FETCH_TRACK, id });

export const fetchTrackSuccess = (id, track) => ({
  type: actionTypes.FETCH_TRACK_SUCCESS,
  id,
  // track
});
