import React from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { reduxStore } from "../types/reduxInterface";
import "./styles/WhiteBoard.css";

const mapStateToProps = (state: reduxStore) => state;

function WhiteBoardOptions() {
  return (
    <div id="boardOptions" className="d-flex px-3 align-items-center">
      <Form.Control type="color" id="colorPicker" />
      <Form.Control
        type="number"
        placeholder="2"
        min="1"
        id="widthPicker"
        className="ml-2"
      />
      px width
    </div>
  );
}

export default connect(mapStateToProps)(WhiteBoardOptions);
