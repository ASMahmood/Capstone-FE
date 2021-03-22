import React, { useEffect } from "react";
import {} from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { listenChat } from "../functions/socket";
import { chatMessage } from "../types/otherInterfaces";
import { reduxStore, individualMessage } from "../types/reduxInterface";
import { messageDispatch } from "../types/dispatchInterfaces";

type chatListProps = reduxStore & messageDispatch;

const mapStateToProps = (state: reduxStore) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  newMessage: (message: object) =>
    dispatch({
      type: "ADD_MESSAGE_TO_CHAT",
      payload: message,
    }),
});

function ChatList(props: chatListProps) {
  useEffect(() => {
    listenChat(props.newMessage);
    console.log("CHATLIST RENDER");
  }, []);

  return (
    <div>
      {props.room.chatHistory.length > 0 &&
        props.room.chatHistory.map((message: individualMessage, i) => (
          <div className="chatMessage" key={i}>
            {message.sender} - {message.text}
          </div>
        ))}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
