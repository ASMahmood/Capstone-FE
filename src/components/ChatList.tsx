import React, { useEffect } from "react";
import {} from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AiOutlineCloudDownload } from "react-icons/ai";
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

export const scrollToBottom = () => {
  console.log("SCROLL BOYS");
  const chatList: Element = document.querySelector("#chatList") as Element;
  chatList.scrollTop = chatList.scrollHeight;
};

function ChatList(props: chatListProps) {
  useEffect(() => {
    listenChat(props.newMessage, scrollToBottom);
    console.log("CHATLIST RENDER");
    autoScrollchat();
  }, []);

  const autoScrollchat = () => {
    const chatList: Element = document.querySelector("#chatList") as Element;
    if (chatList) {
      const shouldScroll =
        chatList.scrollTop + chatList.clientHeight === chatList.scrollHeight;
      if (!shouldScroll) {
        scrollToBottom();
      }
      scrollToBottom();
    }
  };

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
            {message.attachment && message.attachment !== "null" && (
              <div
                className="attachmentDiv"
                onClick={() =>
                  window.open(
                    `${process.env.REACT_APP_BACKEND_URL}/files/${message.attachment}`,
                    "_blank"
                  )
                }
              >
                <AiOutlineCloudDownload fontSize={35} />
                {message.attachment}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
