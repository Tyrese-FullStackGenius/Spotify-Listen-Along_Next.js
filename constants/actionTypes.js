// REF: https://redux.js.org/tutorials/fundamentals/part-1-overview
// REF: https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers

// * note: according to @dan_abramov... creating all of our constants here has a few benefits:
// ==> • It helps keep the naming consistent because all action types are gathered in a single place
// ==> • Sometimes you want to see all existing actions before working on a new feature. It may be that the action you need was already added by somebody on the team, but you didn't know.
// ==> • The list of action types that were added, removed, or changed in a Pull Request helps everyone on the team keep track of scope and implementation of new features
// ==> • If you make a typo when importing an action constant, you will get undefined. This is much easier to notice than a typo when you wonder why nothing happens when the action is dispatached.

// ================================== //
//     ACTION TYPES as CONSTANTS      //
// ================================== //

// QUEUE
export const QUEUE_TRACK = "QUEUE_TRACK";
export const UPDATE_QUEUE = "UPDATE_QUEUE";
export const QUEUE_ENDED = "QUEUE_ENDED";
export const QUEUE_REMOVE_TRACK = "QUEUE_REMOVE_TRACK";

// SEARCH TRACKS
export const SEARCH_TRACKS = "SEARCH_TRACKS";
export const SEARCH_TRACKS_SUCCESS = "SEARCH_TRACKS_SUCCESS";
export const SEARCH_TRACKS_RESET = "SEARCH_TRACKS_RESET";

// FETCH TRACK + FETCH PLAYING CONTEXT
export const FETCH_TRACK = "FETCH_TRACK";
export const FETCH_TRACK_SUCCESS = "FETCH_TRACK_SUCCESS";
export const FETCH_PLAYING_CONTEXT_SUCCESS = "FETCH_PLAYING_CONTEXT_SUCCESS";

// USERS
export const UPDATE_USERS = "UPDATE_USERS";

// SESSION
export const LOAD = "LOAD";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// AUTH + SESSION
export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";
export const PLAY_TRACK = "PLAY_TRACK";
export const UPDATE_NOW_PLAYING = "UPDATE_NOW_PLAYING";
export const PLAY_TRACK_SUCCESS = "PLAY_TRACK_SUCCESS";

// PLAYBACK
export const MUTE_PLAYBACK = "MUTE_PLAYBACK";
export const UNMUTE_PLAYBACK = "UNMUTE_PLAYBACK";

// DEVICES
export const FETCH_AVAILABLE_DEVICES = "FETCH_AVAILABLE_DEVICES";
export const FETCH_AVAILABLE_DEVICES_SUCCESS =
  "FETCH_AVAILABLE_DEVICES_SUCCESS";
export const FETCH_AVAILABLE_DEVICES_ERROR = "FETCH_AVAILABLE_DEVICES_ERROR";

// PLAYBACK + DEVICES
export const TRANSFER_PLAYBACK_TO_DEVICE = "TRANSFER_PLAYBACK_TO_DEVICE";
export const TRANSFER_PLAYBACK_TO_DEVICE_SUCCESS =
  "TRANSFER_PLAYBACK_TO_DEVICE_SUCCESS";
export const TRANSFER_PLAYBACK_TO_DEVICE_ERROR =
  "TRANSFER_PLAYBACK_TO_DEVICE_ERROR";

// VOTE
export const VOTE_UP = "VOTE_UP";
export const VOTE_UP_SUCCESS = "VOTE_UP_SUCCESS";
