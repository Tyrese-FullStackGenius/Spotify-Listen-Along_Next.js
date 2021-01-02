// REF: https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow
// * note: Actions in Redux are plain objects with a TYPE field | Actions are the events that occur in the app based on user input + trigger updates in the state
import * as types from "../constants/ActionTypes.js";

// =============== //
//  FETCH DEVICES  //
// =============== //

export const fetchAvailableDevices = () => ({
  type: types.FETCH_AVAILABLE_DEVICES,
});

export const fetchAvailableDevicesSuccess = (list) => ({
  type: types.FETCH_AVAILABLE_DEVICES_SUCCESS,
  list,
});

export const fetchAvailableDevicesError = (err) => ({
  type: types.FETCH_AVAILABLE_DEVICES_ERROR,
  err,
});

// ================= //
// TRANSFER PLAYBACK //
// ================= //
export const transferPlaybackToDevice = (deviceId) => ({
  type: types.TRANSFER_PLAYBACK_TO_DEVICE,
  deviceId,
});

export const transferPlaybackToDeviceSuccess = () => ({
  type: types.TRANSFER_PLAYBACK_TO_DEVICE_SUCCESS,
});

export const transferPlaybackToDeviceError = (err) => ({
  type: types.TRANSFER_PLAYBACK_TO_DEVICE_ERROR,
  err,
});
