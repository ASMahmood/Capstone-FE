import React, { useEffect } from "react";
import {} from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { listenChat } from "../functions/socket";
import { convertTime } from "../functions/other";
import { chatMessage } from "../types/otherInterfaces";
import { reduxStore, individualMessage } from "../types/reduxInterface";
import { messageDispatch } from "../types/dispatchInterfaces";
import "./styles/ChatList.css";

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
    <div id="chatList">
      {props.room.chatHistory.length > 0 &&
        props.room.chatHistory.map((message: individualMessage, i) => (
          <div
            className={
              message.sender === props.user.username
                ? "userMessage"
                : "otherMessage"
            }
            key={i}
          >
            <div className="sender">
              {message.sender} - {convertTime(message.createdAt)}
            </div>
            <div>{message.text}</div>
          </div>
        ))}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
