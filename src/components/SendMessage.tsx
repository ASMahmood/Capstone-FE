import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { sendChat } from "../functions/socket";
import { Dispatch } from "redux";
import { chatMessage } from "../types/otherInterfaces";
import { reduxStore, individualMessage } from "../types/reduxInterface";
import { messageDispatch } from "../types/dispatchInterfaces";

type sendMessageProps = reduxStore & messageDispatch;

const mapStateToProps = (state: reduxStore) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  newMessage: (message: object) =>
    dispatch({
      type: "ADD_MESSAGE_TO_CHAT",
      payload: message,
    }),
});

function SendMessage(props: sendMessageProps) {
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = {
      sender: props.user.username,
      text: text,
      createdAt: new Date(),
    };
    sendChat({ ...message, roomId: props.room._id });
    props.newMessage(message);
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

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
