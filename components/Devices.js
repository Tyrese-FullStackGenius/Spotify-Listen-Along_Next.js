// REF: https://react-redux.js.org/using-react-redux/connect-mapdispatch
// REF: https://react-redux.js.org/using-react-redux/connect-mapstate
// REF: https://developer.spotify.com/documentation/web-api/guides/using-connect-web-api/

import React from "react";
import { connect } from "react-redux";

import {
  fetchAvailableDevices,
  transferPlaybackToDevice,
} from "../../../listen-along-backend/actions/devicesActions.js";
import { getDevices } from "../../../listen-along-backend/reducers/devicesReducer.js";
import { getIsFetchingDevices } from "../../../listen-along-backend/reducers/index.js";

// ================= //
//      DEVICES      //
// ================= //

class Devices extends React.PureComponent {
  // * note: React.Component vs React.PureComponent... PureComponent does a SHALLOW COMPARISON on state change

  render() {
    const {
      devices,
      isFetching,
      fetchAvailableDevices,
      transferPlaybackToDevice,
    } = this.props;
    return (
      <div style={{ paddingBottom: "10px" }}>
        <h2>{devices.title}</h2>
        <button
          className="btn--base btn--dark"
          disabled={isFetching}
          onClick={() => {
            fetchAvailableDevices();
          }}
        >
          Fetch Devices
        </button>
        {devices.length === 0 ? (
          <p>No Devices...</p>
        ) : (
          <table>
            <tbody>
              {devices.map((device) => (
                <tr>
                  <td>
                    {device.is_active ? (
                      <strong>Active -&gt;</strong>
                    ) : (
                      <button
                        onClick={() => {
                          transferPlaybackToDevice(device.id);
                        }}
                      >
                        Transfer to Device
                      </button>
                    )}
                  </td>
                  <td>{device.name}</td>
                  <td>{device.type}</td>
                  <td>{device.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

// Dispatch actions with mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  fetchAvailableDevices: (index) => dispatch(fetchAvailableDevices(index)),
  transferPlaybackToDevice: (deviceId) =>
    dispatch(transferPlaybackToDevice(deviceId)),
});

// Extract data with mapStateToProps
const mapStateToProps = (state) => ({
  isFetching: getIsFetchingDevices(state),
  devices: getDevices(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
