import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { sendChat } from "../functions/socket";
import { uploadAttachment } from "../functions/api";
import { Dispatch } from "redux";
import { chatMessage } from "../types/otherInterfaces";
import { reduxStore, individualMessage } from "../types/reduxInterface";
import { messageDispatch } from "../types/dispatchInterfaces";
import "./styles/SendMessage.css";

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
  const [attachment, setAttachment] = useState<File>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (attachment !== undefined) {
      //SEND ATTTACHEMT
      const filename = await uploadAttachment(attachment);
      //SEND MESSAGE
      sendMessage(filename);
    } else {
      sendMessage("null");
    }
  };

  const sendMessage = (filename: string) => {
    const message = {
      sender: props.user.username,
      text: text,
      createdAt: new Date(),
      attachment: filename,
    };
    sendChat({ ...message, roomId: props.room._id });
    props.newMessage(message);
    setText("");
  };

  return (
    <div className="mb-4 sendMessageComponent">
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col xs={12}>
            <Form.Group>
              <Form.Control
                type="text"
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs={6}>
            <Button
              type="submit"
              variant="outline-secondary"
              className="sendChatButton"
            >
              SEND
            </Button>
          </Col>
          <Col xs={6}>
            <Form.Group className="position-relative m-0">
              <Form.Label htmlFor="attach" className=" attachChatButton">
                ATTACH
              </Form.Label>
              <Form.Control
                type="file"
                id="attach"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.currentTarget.files !== null) {
                    setAttachment(e.currentTarget.files[0]);
                  }
                }}
              />
            </Form.Group>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
