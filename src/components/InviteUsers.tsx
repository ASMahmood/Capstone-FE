import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./styles/InviteUser.css";

function InviteUsers() {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AiOutlineUserAdd
        className="ml-auto"
        fontSize="30"
        onClick={() => (show ? setShow(false) : setShow(true))}
      />
      <div id="addUserbox" className={show ? "" : "d-none"}>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Email of user..."
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
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
