import React from "react";
import { connect } from "react-redux";
import { reduxStore } from "../types/reduxInterface";

const mapStateToProps = (state: reduxStore) => state;

function CreateRoom(props: reduxStore) {
  return <div className="createRoomBox"></div>;
}

export default connect(mapStateToProps)(CreateRoom);
