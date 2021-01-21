import { useState, useEffect } from "react";
import classes from "./App.module.css";
import { Switch, Route, Link } from "react-router-dom";

import * as actionTypes from "./store/actions";
import { connect } from "react-redux";
import Home from "./containers/Home/Home";
import Settings from "./containers/Settings/Settings"; 
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer.js";

// import { ipcRenderer } from '../../../appRuntime.ts'

function App(props) {
  let [loadedState, setLoadedState] = useState({});
  return (
    <div className={classes.App}>
      {" "}
      {/* <Navigation /> */}{" "}
      <Switch>
        <Route path="/" exact component={Home} />{" "}
        <Route path="/settings" exact component={Settings} />{" "}
        <Route path="/" component={NotFound} />{" "}
      </Switch>{" "}
      <Footer/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    settings:
      state.settings.find((el) => el.profileId === state.currentProfileId) ||
      {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadState: (data) =>
      dispatch({ type: actionTypes.LOAD_STATE, payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
