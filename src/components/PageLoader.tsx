import React from "react";
import logo from "../logo1.png";
import "./styles/PageLoader.css";

function PageLoader() {
  return (
    <div id="pageLoader">
      <div id="secondLayer">
        <img src={logo} alt="loader" className="spinner" />
      </div>
    </div>
  );
}
export default PageLoader;
