import React, { useState, useEffect, useRef } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import { reduxStore } from "./types/reduxInterface";
import { connect } from "react-redux";

import NavBar from "./components/NavBar";
import HomePage from "./pages/Home/HomePage";
import RoomPage from "./pages/Room";
import LoginPage from "./pages/Login";
import PageLoader from "./components/PageLoader";

const exclusionArray = ["/login"];

type appInterface = RouteComponentProps & reduxStore;

const mapStateToProps = (state: reduxStore) => state;

function App(props: appInterface) {
  return (
    <div id="globalStyle">
      {exclusionArray.indexOf(props.location.pathname) < 0 && <NavBar />}
      {props.loading && <PageLoader />}
      <Route path="/" exact component={HomePage} />
      <Route path="/room/:id" component={RoomPage} />
      <Route path="/login" exact component={LoginPage} />
    </div>
  );
}

export default withRouter(connect(mapStateToProps)(App));
