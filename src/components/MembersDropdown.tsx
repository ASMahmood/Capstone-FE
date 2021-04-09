import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Button, InputGroup } from "react-bootstrap";
import { reduxStore } from "../types/reduxInterface";

const mapStateToProps = (state: reduxStore) => state;

function MembersDropdown(props: reduxStore) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <h1 onClick={() => (show ? setShow(false) : setShow(true))}>POG</h1>
      <div id="membersBox" className={show ? "" : "d-none"}>
        <h1>POG 2</h1>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(MembersDropdown);
