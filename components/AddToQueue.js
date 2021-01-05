// REF: https://react-redux.js.org/using-react-redux/connect-mapdispatch
// REF: https://react-redux.js.org/using-react-redux/connect-mapstate
// REF: https://github.com/formatjs/formatjs

import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import {
  searchTracks,
  searchTracksReset,
} from "../features/search/searchActions.js";
import { queueTrack } from "../features/queue/queueActions.js";

// ================== //
//   SEARCH RESULTS   //
// ================== //
// Use SEARCH RESULTS LIST component in ADD TO QUEUE render directly below

class SearchResultsList extends React.Component {
  render() {
    const { results, focus } = this.props;
    return (
      <ul className="search-results-container">
        {results.map((result, index) => {
          const isFocused = focus === index;
          const className =
            "search-results-item" +
            (isFocused ? " search-results-item--focused" : "");
          return (
            <li
              key={result.id}
              className={className}
              onClick={() => this.props.onSelect(result.id)}
            >
              <div className="search-results-item-container">
                <div className="album-img">
                  <img src={result.album.images[2].url} />
                </div>
                <div className="flex-item">
                  <div className="song-name">{result.name}</div>
                  <div className="artist-name">{result.artists[0].name}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

// ================ //
//   ADD TO QUEUE   //
// ================ //

class AddToQueue extends React.Component {
  state = {
    text: this.props.text || "",
    focus: -1,
  };

  handleChange = (event) => {
    const text = event.target.value;
    this.setState({ text: text });
    if (text !== "") {
      this.props.searchTracks(text);
    } else {
      this.setState({ focus: -1 });
      this.props.searchTracksReset();
    }
  };

  handleSelectElement = (id) => {
    this.setState({ text: "" });
    this.props.queueTrack(id);
    this.props.searchTracksReset();
  };

  handleFocus = (event) => {
    if (event.target.value !== "") {
      this.props.searchTracks(event.target.value);
    }
  };

  handleKeyDown = (event) => {
    // REF: https://keycode.info/
    switch (event.keyCode) {
      case 38: // up
        this.setState({ focus: this.state.focus - 1 });
        break;
      case 40: // down
        this.setState({ focus: this.state.focus + 1 });
        break;
      case 13: {
        // enter / return
        let correct = false;
        if (this.state.focus !== -1) {
          this.props.queueTrack(this.props.search.results[this.state.focus].id);
          correct = true;
        } else {
          const text = event.target.value.trim();
          if (text.length !== 0) {
            this.props.queueTrack(text);
            correct = true;
          }
        }
        if (correct) {
          this.setState({ text: "" });
          this.props.searchTracksReset();
          this.setState({ focus: -1 });
        }
        break;
      }
    }
  };

  render() {
    const placeholder = this.props.intl.formatMessage({ id: "queue.add" });
    const results = this.props.search.results;
    return (
      <div className="add-to-queue col-12">
        <input
          className="search-input"
          placeholder={placeholder}
          value={this.state.text}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleFocus}
        />
        {results && (
          <SearchResultsList
            results={results}
            onSelect={this.handleSelectElement}
            focus={this.state.focus}
          />
        )}
      </div>
    );
  }
}

// Dispatch actions with mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  queueTrack: (text) => dispatch(queueTrack(text)),
  searchTracks: (query) => dispatch(searchTracks(query)),
  searchTracksReset: () => dispatch(searchTracksReset()),
});

// Extract data with mapStateToProps
const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AddToQueue));
