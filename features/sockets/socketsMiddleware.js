// REF: https://socket.io/docs/v3
// REF: https://socket.io/docs/v3/middlewares/
// REF: https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
// REF: https://developer.spotify.com/documentation/web-api/reference/search/search/

import {
  VOTE_UP,
  LOGIN_SUCCESS,
  QUEUE_REMOVE_TRACK,
  QUEUE_TRACK,
} from "../../constants/actionTypes.js";
import { updateUsers } from "../users/usersActions.js";
import { updateQueue, queueEnded } from "../queue/queueActions.js";
import { playTrack, updateNowPlaying } from "../playback/playbackActions.js";
import Config from "../../config/app.js";

import io from "socket.io-client";

// ================== //
//       SOCKET       //
// ================== //
// * note: The socket object on both sides (server + client) extends the EventEmitter class, so...
// ==> • socket.emit() sends our event
// ==> • socket.on() receives our event by registering a listener

var socket = null;

const getIdFromTrackString = (trackString = "") => {
  let matches = trackString.match(/^https:\/\/open\.spotify\.com\/track\/(.*)/);
  if (matches) {
    return matches[1];
  }

  matches = trackString.match(/^https:\/\/play\.spotify\.com\/track\/(.*)/);
  if (matches) {
    return matches[1];
  }

  matches = trackString.match(/^spotify:track:(.*)/);
  if (matches) {
    return matches[1];
  }

  return null;
};

export function socketMiddleware(store) {
  return (next) => (action) => {
    const result = next(action);

    if (socket) {
      switch (action.type) {
        // Send our "queue track" event
        case QUEUE_TRACK: {
          let trackId = getIdFromTrackString(action.id);
          if (trackId === null) {
            trackId = action.id;
          }
          socket.emit("queue track", trackId);
          break;
        }

        // Send our "remove track" event
        case QUEUE_REMOVE_TRACK: {
          socket.emit("remove track", action.id);
          break;
        }

        // Send our "user login" event
        case LOGIN_SUCCESS: {
          const user = store.getState().session.user;
          socket.emit("user login", user);
          break;
        }

        // Send our "vote up" event
        case VOTE_UP: {
          socket.emit("vote up", action.id);
          break;
        }

        // DEFAULT: Do nothing...
        default:
          break;
      }
    }

    return result;
  };
}

export default function (store) {
  socket = io.connect(Config.HOST);

  // Listen for "update queue" event
  socket.on("update queue", (data) => {
    // Update state, passing updateQueue() as our action object
    store.dispatch(updateQueue(data));
  });

  // Listen for "queue ended" event
  socket.on("queue ended", () => {
    // Update state, passing queueEnded() as our action object
    store.dispatch(queueEnded());
  });

  // Listen for "play track" event
  socket.on("play track", (track, user, position) => {
    // *** to-do: I should also set repeat to false

    // Update state, passing playTrack() as our action object
    store.dispatch(playTrack(track, user, position));
  });

  // Listen for "update users" event
  socket.on("update users", (data) => {
    // Update state, passing updateUsers() as our action object
    store.dispatch(updateUsers(data));
  });

  // Listen for "update now playing" event
  socket.on("update now playing", (track, user, position) => {
    // Update state, passing updateNowPlaying() as our action object
    store.dispatch(updateNowPlaying(track, user, position));
  });

  // *** to-do: manage end song, end queue
}
