import React from "react";
import { connect } from "react-redux";
import { reduxStore } from "../types/reduxInterface";

const mapStateToProps = (state: reduxStore) => state;

function UserBox(props: reduxStore) {
  return <div>Hello there, {props.user.username}</div>;
}

export default connect(mapStateToProps)(UserBox);
