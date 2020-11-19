import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

import ArtistRoute from "./ArtistRoute";
import GlobalStyles from "./GlobalStyles";

const DEFAULT_ARTIST_ID = "7zDtfSB0AOZWhpuAHZIOw5";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        // console.error(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <>
      <Router>
        <GlobalStyles />
        <Switch>
          <Route exact path="/artists/:artistId">
            <ArtistRoute />
          </Route>
          <Route>
            <Route exact path="/artists/">
              <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
            </Route>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
