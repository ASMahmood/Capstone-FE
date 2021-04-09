import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { connect } from "react-redux";
import { sendEmailInvite } from "../functions/api";
import { reduxStore } from "../types/reduxInterface";
import "./styles/InviteUser.css";

const mapStateToProps = (state: reduxStore) => state;

function InviteUsers(props: reduxStore) {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let status = await sendEmailInvite(email, props.room._id);
      setEmail("");
      console.log(status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AiOutlineUserAdd
        className="ml-3 inviteToggle"
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

export default connect(mapStateToProps)(InviteUsers);
