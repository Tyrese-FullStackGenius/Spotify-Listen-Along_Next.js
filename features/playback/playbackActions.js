// REF: https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
// * note: Actions in Redux are plain objects with a TYPE field | Actions are the events that occur in the app based on user input + trigger updates in the state

import fetch from "isomorphic-unfetch";

import Config from "../config/app.js";
import * as types from "../../constants/actionTypes.js";

// =============== //
//     PLAYBACK    //
// =============== //
export const playTrack = (track, user, position) => ({
  type: types.PLAY_TRACK,
  track,
  user,
  position,
});

export const playTrackSuccess = (track, user, position) => ({
  type: types.PLAY_TRACK_SUCCESS,
  track,
  user,
  position,
});

export const updateNowPlaying = (track, user, position) => ({
  type: types.UPDATE_NOW_PLAYING,
  track,
  user,
  position,
});

// =============== //
//   MUTE/UNMUTE   //
// =============== //
export const mutePlayback = () => ({ type: types.MUTE_PLAYBACK });
export const unmutePlayback = () => ({ type: types.UNMUTE_PLAYBACK });

// ================== //
//   PLAYING CONTEXT  //
// ================== //
export const fetchPlayingContextSuccess = (playingContext) => ({
  type: types.FETCH_PLAYING_CONTEXT_SUCCESS,
  playingContext,
});

export const fetchPlayingContext = () => (dispatch) =>
  fetch(`${Config.HOST}/api/now-playing`)
    .then((res) => res.json())
    .then((res) => dispatch(fetchPlayingContextSuccess(res)));
