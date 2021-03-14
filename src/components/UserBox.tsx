import React from "react";
import { connect } from "react-redux";
import { reduxStore } from "../types/reduxInterface";

const mapStateToProps = (state: reduxStore) => state;

function UserBox() {
  return <div></div>;
}

export default connect(mapStateToProps)(UserBox);
