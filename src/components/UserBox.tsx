import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { reduxStore } from "../types/reduxInterface";
import "./styles/UserBox.css";

const mapStateToProps = (state: reduxStore) => state;

function UserBox(props: reduxStore) {
  return (
    <div className="userInfo">
      <Form>
        <Form.Group>
          <Form.Label htmlFor="ProfilePicSelector">
            <img src={props.user.profilePic} alt="profile" />
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            id="ProfilePicSelector"
            className="filePickerInput"
          />
        </Form.Group>
      </Form>
      <h3>Hello there, {props.user.username}</h3>
    </div>
  );
}

export default connect(mapStateToProps)(UserBox);
