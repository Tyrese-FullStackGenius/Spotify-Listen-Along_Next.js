// REF: https://developer.spotify.com/documentation/web-api/reference/
// REF: https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
// REF: https://developer.spotify.com/documentation/general/guides/authorization-guide/
// REF: https://developer.spotify.com/documentation/general/guides/scopes/

import fetch from "isomorphic-unfetch";

import { LOAD, LOGIN } from "../../constants/actionTypes.js";
import {
  loginSuccess,
  updateCurrentUser,
  updateTokenSuccess,
} from "../session/sessionActions.js";

import Config from "../../config/app.js";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

// ================== //
//      SESSION       //
// ================== //

// *** to-do: separate out my controllers from my middleware

const getCurrentUser = () => (dispatch, getState) =>
  fetch(`${SPOTIFY_API_BASE}/me`, {
    headers: {
      Authorization: "Bearer " + getState().session.access_token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(updateCurrentUser(res));
    });

const updateToken = () => (dispatch, getState) => {
  return fetch(`${Config.HOST}/auth/token`, {
    method: "POST",
    body: JSON.stringify({
      refresh_token: getState().session.refresh_token,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch(updateTokenSuccess(res.access_token));
    });
};

export default (store) => (next) => (action) => {
  const result = next(action);
  switch (action.type) {
    // Load auth for user...
    case LOAD: {
      const session = store.getState().session;
      const expiresIn = session.expires_in;
      const needsToUpdate =
        !expiresIn || expiresIn - Date.now() < 10 * 60 * 1000;
      if (needsToUpdate) {
        console.log(`sessionMiddleware says... > needs to update access token`);
        const refreshToken = session.refresh_token;
        if (refreshToken) {
          console.log(`sessionMiddleware says... > using refresh token`);
          store
            .dispatch(updateToken())
            .then(() => {
              return store.dispatch(getCurrentUser());
            })
            .then(() => {
              store.dispatch(loginSuccess());
            });
        }
      } else {
        console.log(
          `sessionMiddleware says... > no need to update access token`
        );
        store.dispatch(getCurrentUser()).then(() => {
          store.dispatch(loginSuccess());
        });
      }
      break;
    }

    // Login user...
    case LOGIN: {
      const getLoginURL = (scopes) => {
        return `${Config.HOST}/auth/login?scope=${encodeURIComponent(
          scopes.join(" ")
        )}`;
      };

      // REF: https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
      const width = 450,
        height = 730,
        left = window.screen.width / 2 - width / 2,
        top = window.screen.height / 2 - height / 2;

      const messageFunc = (event) => {
        try {
          const hash = JSON.parse(event.data);
          if (hash.type === "access_token") {
            window.removeEventListener("message", messageFunc, false);
            const accessToken = hash.access_token;
            const expiresIn = hash.expires_in;
            if (accessToken === "") {
              // *** to-do: implement login error
            } else {
              const refreshToken = hash.refresh_token;
              localStorage.setItem("refreshToken", refreshToken);
              localStorage.setItem("accessToken", accessToken);
              localStorage.setItem("expiresIn", Date.now() + expiresIn * 1000);
              store.dispatch(updateTokenSuccess(accessToken));
              store
                .dispatch(getCurrentUser())
                .then(() => store.dispatch(loginSuccess()));
            }
          }
        } catch (err) {
          console.error(err);
        }
      };
      window.addEventListener("message", messageFunc, false);

      // SCOPES:
      // ==> • user-read-playback-state | Read access to a user's player state
      // ==> • user-modify-playback-state | Write access to a user's playback state
      const url = getLoginURL([
        `user-read-playback-state`,
        `user-modify-playback-state`,
      ]);

      // REF: https://stackoverflow.com/questions/45580904/implement-log-in-with-spotify-popup
      window.open(
        url,
        "Spotify",
        `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=` +
          width +
          `, height=` +
          height +
          `, top=` +
          top +
          `, left=` +
          left
      );

      break;
    }

    // DEFAULT: Do nothing...
    default:
      break;
  }

  return result;
};
