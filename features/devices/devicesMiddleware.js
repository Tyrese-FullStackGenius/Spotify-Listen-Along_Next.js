// REF: https://developer.spotify.com/documentation/web-api/reference/
// REF: https://developer.spotify.com/documentation/web-api/reference/player/
// REF: https://developer.spotify.com/documentation/web-api/guides/using-connect-web-api/

import fetch from "isomorphic-unfetch";

import {
  FETCH_AVAILABLE_DEVICES,
  TRANSFER_PLAYBACK_TO_DEVICE,
} from "../../constants/actionTypes.js";

import {
  fetchAvailableDevices,
  fetchAvailableDevicesSuccess,
  fetchAvailableDevicesError,
  transferPlaybackToDeviceSuccess,
  transferPlaybackToDeviceError,
} from "../devices/devicesActions.js";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

// ================== //
//       DEVICES      //
// ================== //

// *** to-do: separate out my controllers from my middleware

export default (store) => (next) => (action) => {
  const result = next(action);
  switch (action.type) {
    // Retrieve a list of available devices
    case FETCH_AVAILABLE_DEVICES: {
      fetch(`${SPOTIFY_API_BASE}/me/player/devices`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState().session.access_token}`,
        },
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.error) {
            store.dispatch(fetchAvailableDevicesError(r.error));
          } else {
            store.dispatch(fetchAvailableDevicesSuccess(r.devices));
          }
        });
      break;
    }

    // Set playback to "COLLABORATIVE" by selecting a device ("Collaborative" will be one)
    case TRANSFER_PLAYBACK_TO_DEVICE: {
      fetch(`${SPOTIFY_API_BASE}/me/player`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${store.getState().session.access_token}`,
        },
        body: JSON.stringify({
          device_ids: [action.decideId],
        }),
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.error) {
            store.dispatch(transferPlaybackToDeviceError(r.error));
          } else {
            store.dispatch(transferPlaybackToDeviceSuccess());
            store.dispatch(fetchAvailableDevices());
          }
        });
      break;
    }

    // DEFAULT: Do nothing...
    default:
      break;
  }

  return result;
};
