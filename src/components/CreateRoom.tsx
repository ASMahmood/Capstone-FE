import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxStore } from "../types/reduxInterface";
import { Form, Button } from "react-bootstrap";
import "./styles/CreateRoom.css";
import { createRoomFetch } from "../functions/api";

const mapStateToProps = (state: reduxStore) => state;

function CreateRoom(props: reduxStore) {
  const [roomName, setRoomName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createRoomFetch(roomName);
    if (response.message === "help us") {
      console.log("UH OH STINKY");
    } else {
    }
  };

  return (
    <div className="createRoomBox">
      <h4>Create a Room...</h4>
      <Form inline onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.currentTarget.value)}
        />
        <Button type="submit" variant="outline-warning">
          CREATE
        </Button>
      </Form>
    </div>
  );
}

export default connect(mapStateToProps)(CreateRoom);
