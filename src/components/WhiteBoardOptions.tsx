import React from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { reduxStore } from "../types/reduxInterface";
import "./styles/WhiteBoard.css";

const mapStateToProps = (state: reduxStore) => state;

function WhiteBoardOptions() {
  return (
    <div id="boardOptions">
      <Form.Control type="color" id="colorPicker" />
    </div>
  );
}

export default connect(mapStateToProps)(WhiteBoardOptions);
