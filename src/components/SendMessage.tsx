import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { listenChat } from "../functions/socket";
import { chatMessage } from "../types/otherInterfaces";
import { reduxStore, individualMessage } from "../types/reduxInterface";

const mapStateToProps = (state: reduxStore) => state;

function SendMessage(props: reduxStore) {
  return (
    <div>
      <Form>
        <Form.Control type="text" />
      </Form>
    </div>
  );
}

export default connect(mapStateToProps)(SendMessage);
