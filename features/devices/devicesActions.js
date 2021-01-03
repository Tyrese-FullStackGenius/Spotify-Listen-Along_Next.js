// REF: https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
// * note: Actions in Redux are plain objects with a TYPE field | Actions are the events that occur in the app based on user input + trigger updates in the state
import * as actionTypes from "../../constants/actionTypes.js";

// =============== //
//  FETCH DEVICES  //
// =============== //

export const fetchAvailableDevices = () => ({
  type: actionTypes.FETCH_AVAILABLE_DEVICES,
});

export const fetchAvailableDevicesSuccess = (list) => ({
  type: actionTypes.FETCH_AVAILABLE_DEVICES_SUCCESS,
  list,
});

export const fetchAvailableDevicesError = (err) => ({
  type: actionTypes.FETCH_AVAILABLE_DEVICES_ERROR,
  err,
});

// ================= //
// TRANSFER PLAYBACK //
// ================= //
export const transferPlaybackToDevice = (deviceId) => ({
  type: actionTypes.TRANSFER_PLAYBACK_TO_DEVICE,
  deviceId,
});

export const transferPlaybackToDeviceSuccess = (list) => ({
  type: actionTypes.TRANSFER_PLAYBACK_TO_DEVICE_SUCCESS,
});

export const transferPlaybackToDeviceError = (list) => ({
  type: actionTypes.TRANSFER_PLAYBACK_TO_DEVICE_ERROR,
  err,
});
