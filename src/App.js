import { useState, useEffect } from "react";
import classes from "./App.module.css";
import { Switch, Route, Link } from "react-router-dom";

import * as actionTypes from "./store/actions";
import { connect } from "react-redux";
import Home from "./containers/Home/Home";
import Settings from "./containers/Settings/Settings"; 
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer.js";
import { ipcRenderer } from './appRuntime'

import { useHistory } from "react-router-dom";

function App(props) {
  const history = useHistory();

  let [loadedState, setLoadedState] = useState({});

  // Register ipc listener on every rerender
  useEffect(() => {
    let openSettingsListener = (event) => {
      // Send to redux
      props.onToggleSettings(!props.settingsOpen)
    }
    ipcRenderer.on("openSettings", openSettingsListener)

    // Clean up listeners on unmount to prevent event leaks
    return () => {
      ipcRenderer.removeListener("openSettings", openSettingsListener)
    }
  })

  useEffect(() => {
    if (props.settingsOpen)
      history.push("/settings")
    else
      history.push("/")
  },[props.settingsOpen])

  return (
    <div className={classes.App}>
      {" "}
      {/* <Navigation /> */}{" "}
      <Switch>
        <Route path="/" exact component={Home} />{" "}
        <Route path="/settings" exact component={Settings} />{" "}
        <Route path="/" component={NotFound} />{" "}
      </Switch>{" "}
      {/* <Footer/> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    settings:
      state.settings.find((el) => el.profileId === state.currentProfileId) ||
      {},
    settingsOpen: state.settingsOpen || false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadState: (data) =>
      dispatch({ type: actionTypes.LOAD_STATE, payload: data }),
    onToggleSettings: (toggle) => 
      dispatch({ type: actionTypes.TOGGLE_SETTINGS, payload: { toggle: toggle } }),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
