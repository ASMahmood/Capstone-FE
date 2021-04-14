import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Button, InputGroup } from "react-bootstrap";
import { reduxStore } from "../types/reduxInterface";

const mapStateToProps = (state: reduxStore) => state;

function MembersDropdown(props: reduxStore) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <h5
        onClick={() => (show ? setShow(false) : setShow(true))}
        className="ml-3 my-0"
      >
        {props.room.participants.length} member
        {props.room.participants.length > 1 && "s"}
      </h5>

      <div id="membersBox" className={show ? "" : "d-none"}>
        <h1>POG 2</h1>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(MembersDropdown);
