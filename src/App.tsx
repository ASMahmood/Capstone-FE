import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/Home/HomePage";
import RoomPage from "./pages/Room";
import LoginPage from "./pages/Login";

const exclusionArray = ["/login"];

function App(props: RouteComponentProps) {
  return (
    <div id="globalStyle">
      {exclusionArray.indexOf(props.location.pathname) < 0 && <NavBar />}

      <Route path="/" exact component={HomePage} />
      <Route path="/room/:id" component={RoomPage} />
      <Route path="/login" exact component={LoginPage} />
    </div>
  );
}

export default withRouter(App);
