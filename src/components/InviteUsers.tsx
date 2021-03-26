import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./styles/InviteUser.css";

function InviteUsers() {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  return (
    <>
      <AiOutlineUserAdd
        className="ml-auto"
        fontSize="30"
        onClick={() => (show ? setShow(false) : setShow(true))}
      />
      <div id="addUserbox" className={show ? "" : "d-none"}>
        <Form>
          <InputGroup>
            <Form.Control type="text" placeholder="Email of user..." />
            <InputGroup.Append>
              <Button type="submit" variant="secondary">
                ADD
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    </>
  );
}

export default InviteUsers;
