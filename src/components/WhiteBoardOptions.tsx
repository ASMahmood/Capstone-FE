import React from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { reduxStore } from "../types/reduxInterface";
import { FaPalette } from "react-icons/fa";
import "./styles/WhiteBoard.css";

const mapStateToProps = (state: reduxStore) => state;

function WhiteBoardOptions() {
  return (
    <div id="boardOptions" className="d-flex px-3 align-items-center">
      <Form.Control
        type="number"
        placeholder="2"
        min="1"
        id="widthPicker"
        className="ml-2"
      />
      px width
      <Form.Label className="ml-4" htmlFor="colorPicker">
        <FaPalette fontSize="20" />
      </Form.Label>
      <Form.Control type="color" id="colorPicker" />
    </div>
  );
}

export default connect(mapStateToProps)(WhiteBoardOptions);
