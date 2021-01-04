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
  <div className="header-container">
    {/* *** to-do: ADD YOUR LINKS, BRO! Do you actually wanna do an about page? *** */}
    <Link href="/">
      <a className="link-base main-link">
        <img src="/images/listen-along-wordmark-dark.svg" height="75" />
      </a>
    </Link>
    {/* <a className="link-base" href="# ANCHOR TO BOTTOM/ABOUT SECTION">
      <FormattedMessage id="about" />
    </a> */}
    {session.user ? (
      <div className="media user-header">
        <div className="media__img">
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
        </div>
        <div className="user-name media__bd">
          {getNameFromUser(session.user)}
        </div>
      </div>
    ) : (
      <button
        className="btn--base btn--login"
        style={{ float: "right" }}
        onClick={login}
      >
        <FormattedMessage id="login" />
      </button>
    )}
    {session.user ? (
      <div className="playback-control">
        <button
          className="btn--base btn--dark"
          onClick={() => {
            muted ? unmutePlayback() : mutePlayback();
          }}
        >
          {muted ? "Unmute" : "Mute"}
        </button>
      </div>
    ) : null}
  </div>
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
