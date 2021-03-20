import React from "react";
import { connect } from "react-redux";
import { reduxStore, individualRoom } from "../types/reduxInterface";
import { populateRoomDispatch } from "../types/dispatchInterfaces";
import { ListGroup } from "react-bootstrap";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { fetchRoom } from "../functions/api";
import "./styles/RoomList.css";

type roomListProps = reduxStore & populateRoomDispatch & RouteComponentProps;

const mapStateToProps = (state: reduxStore) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  populateRoom: (room: object) =>
    dispatch({
      type: "POPULATE_ROOM",
      payload: room,
    }),
});

function RoomList(props: roomListProps) {
  const handleClick = async (id: string) => {
    const response = await fetchRoom(id);
    if (Object.keys(response).length > 1) {
      await props.populateRoom(response);
      props.history.push("/room/" + id);
    } else {
      console.log("error! in da matrix");
    }
  };
  return (
    <div className="roomListBox">
      <h4>Open Rooms</h4>
      <ListGroup variant="flush">
        {props.user.rooms.length > 0 ? (
          props.user.rooms.map((room: individualRoom, i) => (
            <ListGroup.Item
              key={i}
              className="roomListing"
              onClick={() => handleClick(room._id)}
            >
              {room.name} - {room.participants.length} members
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
