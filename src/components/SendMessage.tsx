import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { sendChat } from "../functions/socket";
import { chatMessage } from "../types/otherInterfaces";
import { reduxStore, individualMessage } from "../types/reduxInterface";

const mapStateToProps = (state: reduxStore) => state;

function SendMessage(props: reduxStore) {
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = {
      sender: props.user.username,
      text: text,
      createdAt: new Date(),
      roomId: props.room._id,
    };
    sendChat(message);
    setText("");
  };

  return (
    <div className="mb-4">
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <Button type="submit" variant="outline-warning">
          SEND
        </Button>
      </Form>
    </div>
  );
}

export default connect(mapStateToProps)(SendMessage);
