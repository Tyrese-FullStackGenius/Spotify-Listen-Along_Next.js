// REF: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
// REF: https://medium.com/@ItsMeDannyZ/how-to-build-a-progress-bar-with-react-8c5e79731d1f

import React from "react";

// ================= //
//    NOW PLAYING    //
// ================= //

class NowPlaying extends React.PureComponent {
  // * note: React.Component vs React.PureComponent... PureComponent does a SHALLOW COMPARISON on state change
  constructor() {
    super();
    this.state = {
      start: Date.now(),
      currentPosition: 0,
    };
    this.timer = null;

    // REF: https://stackoverflow.com/questions/53526964/why-this-tick-and-this-tick-are-not-the-same
    this.tick = () => {
      this.setState({
        currentPosition:
          Date.now() - this.state.start + (this.props.position || 0),
      });
    };
  }

  componentWillReceiveProps(props) {
    if (
      this.props.position !== props.position ||
      this.props.track !== props.track
    ) {
      this.setState({
        start: Date.now(),
        currentPosition: 0,
      });
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 300);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    // Store current song's current position for progress bar
    const percentage =
      +(
        (this.state.currentPosition * 100) /
        this.props.track.duration_ms
      ).toFixed(2) + "%";
    const userName = this.props.user.display_name || this.props.user.id;
    return (
      <div className="now-playing">
        <div className="now-playing__text media">
          <div className="media__img">
            <img
              src={this.props.track.album.images[1].url}
              width="170"
              height="170"
            />
          </div>
          <div className="now-playing__bd media__bd">
            <div className="now-playing__track-name">
              {this.props.track.name}
            </div>
            <div className="now-playing__artist-name">
              {this.props.track.artists.map((artist) => artist.name).join(", ")}
            </div>
            <div className="media__img">
              <img
                className="user-image"
                src={
                  (this.props.user.images &&
                    this.props.user.images.length &&
                    this.props.user.images[0].url) ||
                  "/images/user-icon.svg"
                }
                width="30"
                height="30"
                alt={userName}
                title={userName}
              />
            </div>
            <div className="user-name media__bd">{userName}</div>
          </div>
        </div>
        <div className="now-playing__progress">
          <div
            className="now-playing__progress_bar"
            style={{ width: percentage }}
          />
        </div>
      </div>
    );
  }
}

export default NowPlaying;
