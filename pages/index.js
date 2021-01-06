// REF: https://react-redux.js.org/using-react-redux/connect-mapdispatch
// REF: https://react-redux.js.org/using-react-redux/connect-mapstate

import React from "react";
import withRedux from "next-redux-wrapper";
import Layout from "../components/Layout.js";
import About from "../components/About.js";
import { initStore } from "../store/store.js";
import { fetchQueue } from "../features/queue/queueActions.js";
import { fetchUsers } from "../features/users/usersActions.js";
import { fetchPlayingContext } from "../features/playback/playbackActions.js";
import Users from "../components/Users.js";
import Queue from "../components/Queue.js";
import AddToQueue from "../components/AddToQueue.js";
import NowPlaying from "../components/NowPlaying.js";
import Devices from "../components/Devices.js";

import PageWithIntl from "../components/ReactIntl.js";

// ================= //
//        HOME       //
// ================= //

class Main extends React.Component {
  static getInitialProps({ req, store, isServer }) {
    return Promise.all([
      store.dispatch(fetchQueue()),
      store.dispatch(fetchUsers()),
      store.dispatch(fetchPlayingContext()),
    ]);
  }
  render() {
    return (
      <Layout>
        {this.props.playing.track ? (
          <NowPlaying
            track={this.props.playing.track}
            user={this.props.playing.user}
            position={this.props.playing.position}
          />
        ) : null}
        <div className="core-app-container">
          <div className="queue-container container">
            <Queue items={this.props.queue} session={this.props.session} />

            {/* If user is logged-in, then show Queue */}
            {this.props.session.user !== null ? <AddToQueue /> : null}
          </div>
          <div className="users-container ">
            <Users items={this.props.users} />

            {/* If user is logged-in, then show Devices */}
            {this.props.session.user !== null ? <Devices /> : null}
          </div>
        </div>
        <div className="about-container container">
          <About />
        </div>
      </Layout>
    );
  }
}

// Extract data with mapStateToProps
const mapStateToProps = (state) => ({
  playing: state.playback,
  queue: state.queue,
  users: state.users,
  session: state.session,
});

export default withRedux(initStore, mapStateToProps, null)(PageWithIntl(Main));
