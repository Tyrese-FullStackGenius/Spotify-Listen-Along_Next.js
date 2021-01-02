// REF: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
// * note: Reducers are functions that calculate a new state value based on previous state + an action

import {
  FETCH_PLAYING_CONTEXT_SUCCESS,
  PLAY_TRACK_SUCCESS,
  QUEUE_ENDED,
  MUTE_PLAYBACK,
  UNMUTE_PLAYBACK,
  UPDATE_NOW_PLAYING,
} from "../constants/ActionTypes.js";

// ================== //
//   PLAYBACK SLICE   //
// ================== //

const initialState = {
  muted: false,
};

export default (state, action) => {
  switch (action.type) {
    case FETCH_PLAYING_CONTEXT_SUCCESS:
      return {
        ...state,
        track: action.playingContext.track,
        user: action.playingContext.user,
        position: 0,
      };
    case PLAY_TRACK_SUCCESS:
      return {
        ...state,
        track: action.track,
        user: action.user,
        position: action.position,
        startTime: new Date(),
      };
    case UPDATE_NOW_PLAYING:
      return {
        ...state,
        track: action.track,
        user: action.user,
        position: action.position,
        startTime: new Date(),
      };
    case QUEUE_ENDED: {
      return initialState;
    }
    case MUTE_PLAYBACK:
      return { ...state, muted: true };
    case UNMUTE_PLAYBACK:
      return { ...state, muted: false };
    default:
      return state ? state : initialState;
  }
};
