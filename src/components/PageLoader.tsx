import React from "react";
import logo from "../logo.svg";
import "./styles/PageLoader.css";

function PageLoader() {
  return (
    <div id="pageLoader">
      <div id="secondLayer">
        <img src={logo} alt="loader" />
      </div>
    </div>
  );
}
export default PageLoader;
