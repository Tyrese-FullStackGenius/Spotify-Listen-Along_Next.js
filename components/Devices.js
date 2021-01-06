// REF: https://react-redux.js.org/using-react-redux/connect-mapdispatch
// REF: https://react-redux.js.org/using-react-redux/connect-mapstate
// REF: https://developer.spotify.com/documentation/web-api/guides/using-connect-web-api/
// REF: https://github.com/formatjs/formatjs

import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import {
  fetchAvailableDevices,
  transferPlaybackToDevice,
} from "../features/devices/devicesActions.js";
import { getDevices } from "../features/devices/devicesReducer.js";
import { getIsFetchingDevices } from "../ROOT-REDUCER/index.js";

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
      <div className="row justify-content-center p-1">
        <div className="col-12">
          <h2 className="devices-heading">
            <FormattedMessage id="devices.title" />
          </h2>
          <button
            className="btn dark fetch-devices-btn"
            disabled={isFetching}
            onClick={() => {
              fetchAvailableDevices();
            }}
          >
            <FormattedMessage id="devices.fetch" />
          </button>
        </div>
        {devices.length === 0 ? (
          <p>
            <FormattedMessage id="devices.empty" />
          </p>
        ) : (
          <table className="devices-table">
            <tbody>
              {devices.map((device) => (
                <tr className="transfer-devices-container">
                  <td>
                    {device.is_active ? (
                      <strong>
                        Active{" "}
                        <i class="far fa-arrow-alt-circle-right fa-icon"></i>
                      </strong>
                    ) : (
                      <button
                        className="btn dark transfer-devices-btn"
                        onClick={() => {
                          transferPlaybackToDevice(device.id);
                        }}
                      >
                        <FormattedMessage id="devices.transfer" />
                      </button>
                    )}
                  </td>
                  <td>{device.name}</td>
                  <td>{device.type}</td>
                  {/* <td>{device.volume}</td> */}
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
