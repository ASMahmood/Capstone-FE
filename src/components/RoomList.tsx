import React from "react";
import { connect } from "react-redux";
import { reduxStore, individualRoom } from "../types/reduxInterface";
import {
  populateRoomDispatch,
  loaderDispatch,
} from "../types/dispatchInterfaces";
import { ListGroup } from "react-bootstrap";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { fetchRoom } from "../functions/api";
import "./styles/RoomList.css";

type roomListProps = reduxStore &
  populateRoomDispatch &
  RouteComponentProps &
  loaderDispatch;

const mapStateToProps = (state: reduxStore) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  populateRoom: (room: object) =>
    dispatch({
      type: "POPULATE_ROOM",
      payload: room,
    }),
  toggleLoader: (current: boolean) =>
    dispatch({ type: "TOGGLE_LOADING", payload: current }),
});

function RoomList(props: roomListProps) {
  const handleClick = async (id: string) => {
    const response = await fetchRoom(id);
    if (Object.keys(response).length > 1) {
      props.toggleLoader(true);
      await props.populateRoom(response);
      props.history.push("/room/" + id);
    } else {
      console.log("error! in da matrix");
    }
  };
  return (
    <div className="roomListBox">
      <h4>Your Rooms</h4>
      <ListGroup variant="flush" className="actualListOfRooms">
        {props.user.rooms.length > 0 ? (
          props.user.rooms.map((room: individualRoom, i) => (
            <ListGroup.Item
              key={i}
              className="roomListing"
              onClick={() => handleClick(room._id)}
            >
              <h5>{room.name}</h5>
              {room.participants.length} member
              {room.participants.length > 1 && "s"}
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item className="noListings">No Rooms</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RoomList)
);
