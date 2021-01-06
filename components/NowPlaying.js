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

  // componentDidUpdate(props) {
  //   if (
  //     this.props.position !== props.position ||
  //     this.props.track !== props.track
  //   ) {
  //     this.setState({
  //       start: Date.now(),
  //       currentPosition: 0,
  //     });
  //   }
  // }

  UNSAFE_componentWillReceiveProps(props) {
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
      <div className="now-playing-container row justify-content-center p-3">
        <div className="now-playing-img-container">
          <img src={this.props.track.album.images[1].url} />
        </div>
        <div className="now-playing-details">
          <div className="now-playing-track-name">{this.props.track.name}</div>
          <div className="now-playing-artist-name">
            {this.props.track.artists.map((artist) => artist.name).join(", ")}
          </div>
          <div className="now-playing-user-info">
            <div className="now-playing-user-image-container">
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
          </div>
          <div className="user-name">{userName}</div>
        </div>

        <div className="now-playing-progress justify-content-center p-1">
          <div
            className="now-playing-progress-bar"
            style={{ width: percentage }}
          />
        </div>
      </div>
    );
  }
}

export default NowPlaying;
