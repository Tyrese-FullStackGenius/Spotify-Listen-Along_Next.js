// REF: https://react-redux.js.org/using-react-redux/connect-mapdispatch
// REF: https://react-redux.js.org/using-react-redux/connect-mapstate
// REF: // REF: https://github.com/formatjs/formatjs

import React from "react";
import { connect } from "react-redux";

import Link from "next/link";
import { FormattedMessage } from "react-intl";

import { login } from "../features/session/sessionActions.js";
import {
  mutePlayback,
  unmutePlayback,
} from "../features/playback/playbackActions.js";

const getNameFromUser = (user) => {
  return user.display_name || user.id;
};

// ================= //
//      HEADER       //
// ================= //

const Header = ({ session, muted, mutePlayback, unmutePlayback, login }) => (
  <nav className="navbar sticky-top navbar-expand-lg navbar-light">
    <ul className="navbar-nav header mr-auto mx-3">
      <li className="nav-item mx-3 p-2">
        <Link href="/">
          <a className="link-base main-link nav-link">
            <img
              src="/images/listen-along-wordmark-dark.svg"
              height="65"
              alt="Listen Along wordmark"
            />
          </a>
        </Link>
      </li>
      {session.user ? (
        <li className="nav-item mx-3 p-2">
          <img
            className="user-image"
            src={
              (session.user.images &&
                session.user.images.length &&
                session.user.images[0].url) ||
              "/images/user-icon.svg"
            }
            width="30"
            height="30"
            alt={getNameFromUser(session.user)}
          />
          <div className="user-name">{getNameFromUser(session.user)}</div>
        </li>
      ) : (
        <li className="nav-item mx-3 p-2">
          <button className="btn--base btn--login" onClick={login}>
            <FormattedMessage id="login" />
          </button>
        </li>
      )}
      {session.user ? (
        <li className="nav-item mx-3 p-2">
          <button
            className="btn--base btn--dark"
            onClick={() => {
              muted ? unmutePlayback() : mutePlayback();
            }}
          >
            {muted ? "Unmute" : "Mute"}
          </button>
        </li>
      ) : null}
    </ul>
  </nav>
);

// Dispatch actions with mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  mutePlayback: () => dispatch(mutePlayback()),
  unmutePlayback: () => dispatch(unmutePlayback()),
});

// Extract data with mapStateToProps
const mapStateToProps = (state) => ({
  session: state.session,
  muted: state.playback.muted,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
