// REF: https://developer.spotify.com/documentation/web-api/reference/
// REF: https://developer.spotify.com/documentation/web-api/reference/search/search/

import fetch from "isomorphic-unfetch";

import { SEARCH_TRACKS } from "../../constants/actionTypes.js";
import { searchTracksSuccess } from "../search/searchActions.js";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

// ================== //
//       SEARCH       //
// ================== //

// *** to-do: separate out my controllers from my middleware

const searchTracks = (query) => (dispatch, getState) => {
  // *** FOUND THE BELOW RE:  *wildcards*  ON STACK OVERFLOW AS A "trick to improve search results"
  // ================================
  // *** START - NOT WRITTEN BY TCS ***

  let shouldAddWildcard = false;
  if (query.length > 1) {
    const words = query.split(" ");
    const lastWord = words[words.length - 1];
    if (
      /^[a-z0-9\s]+$/i.test(lastWord) &&
      query.lastIndexOf("*") !== query.length - 1
    ) {
      shouldAddWildcard = true;
    }
  }

  const wildcardQuery = `${query}${shouldAddWildcard ? "*" : ""}`;

  return fetch(
    `${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(
      wildcardQuery
    )}&type=track&limit=10`,
    {
      // *** END - NOT WRITTEN BY TCS ***
      // ================================

      headers: {
        Authorization: `Bearer ` + getState().session.access_token,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      dispatch(searchTracksSuccess(query, res.tracks.items));
    });
};

export default (store) => (next) => (action) => {
  const result = next(action);
  switch (action.type) {
    // Search tracks...
    case SEARCH_TRACKS: {
      return store.dispatch(searchTracks(action.query));
      break;
    }

    // DEFAULT: Do nothing...
    default:
      break;
  }

  return result;
};
