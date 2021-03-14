import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, withRouter } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/Home/HomePage";

function App() {
  return (
    <div id="globalStyle">
      <NavBar />
      <Route path="/" exact component={HomePage} />
    </div>
  );
}

export default App;
