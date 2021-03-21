import React, { useEffect } from "react";
import {} from "react-bootstrap";
import { connect } from "react-redux";
import { mainChat } from "../functions/chat";
import { reduxStore } from "../types/reduxInterface";

const mapStateToProps = (state: reduxStore) => state;

function ChatList(props: reduxStore) {
  useEffect(() => {
    mainChat(props);
  }, []);
  return (
    <div>
      {props.room.chatHistory.length > 0 &&
        props.room.chatHistory.map((message, i) => (
          <div className="chatMessage">HI</div>
        ))}
    </div>
  );
}

export default connect(mapStateToProps)(ChatList);
