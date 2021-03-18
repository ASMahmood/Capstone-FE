import React from "react";
import { connect } from "react-redux";
import { reduxStore, individualRoom } from "../types/reduxInterface";
import { ListGroup } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./styles/RoomList.css";

type roomListProps = reduxStore & RouteComponentProps;

const mapStateToProps = (state: reduxStore) => state;

function RoomList(props: roomListProps) {
  return (
    <div className="roomListBox">
      <h4>Open Rooms</h4>
      <ListGroup variant="flush">
        {props.user.rooms.length > 0 ? (
          props.user.rooms.map((room: individualRoom, i) => (
            <ListGroup.Item
              key={i}
              className="roomListing"
              onClick={() => props.history.push("/room/" + room._id)}
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

export default withRouter(connect(mapStateToProps)(RoomList));
