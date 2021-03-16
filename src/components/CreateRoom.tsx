import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxStore } from "../types/reduxInterface";
import { populateUserDispatch } from "../types/dispatchInterfaces";
import { Form, Button } from "react-bootstrap";
import "./styles/CreateRoom.css";
import { Dispatch } from "redux";
import { createRoomFetch, addUserToRoom, fetchMe } from "../functions/api";

type createRoomProps = reduxStore & populateUserDispatch;

const mapStateToProps = (state: reduxStore) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  populateUser: (user: object) =>
    dispatch({
      type: "POPULATE_USER",
      payload: user,
    }),
});

function CreateRoom(props: createRoomProps) {
  const [roomName, setRoomName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createRoomFetch(roomName);
    if (response.message === "help us") {
      console.log("UH OH STINKY");
    } else {
      const res2 = await addUserToRoom(response.message, props.user._id);
      if (res2.message === "authorized") {
        const user = await fetchMe();
        props.populateUser(user);
        setRoomName("");
      } else {
        console.log("SECOND STINKY");
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);
