import React, { useEffect } from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Dispatch } from "redux";
import { reduxStore } from "../../types/reduxInterface";
import { populateRoomDispatch } from "../../types/dispatchInterfaces";
import { MatchParams } from "../../types/routerDomInterfaces";
import { leaveRoom } from "../../functions/socket";
import { fetchRoom } from "../../functions/api";
import WhiteBoard from "../../components/WhiteBoard";
import WhiteBoardOption from "../../components/WhiteBoardOptions";
import ChatList from "../../components/ChatList";
import SendMessage from "../../components/SendMessage";
import InviteUsers from "../../components/InviteUsers";

type roomProps = reduxStore &
  populateRoomDispatch &
  RouteComponentProps<MatchParams>;

const mapStateToProps = (state: reduxStore) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  populateRoom: (room: object) =>
    dispatch({
      type: "POPULATE_ROOM",
      payload: room,
    }),
});

function RoomPage(props: roomProps) {
  useEffect(() => {
    console.log(props.location.search);
    const getAndPopulate = async (id: string) => {
      const response = await fetchRoom(id);
      if (Object.keys(response).length > 1) {
        await props.populateRoom(response);
      } else {
        console.log("error! in da matrix");
      }
    };
    getAndPopulate(props.match.params.id);
    return () => {
      leaveRoom({
        roomId: props.room._id,
        username: props.user.username,
        userId: props.user._id,
      });
    };
  }, []);
  return (
    <Container fluid className="roomBody">
      <Row>
        <Col xs={12} className="roomNavTop d-flex align-items-center">
          <h2 className="m-0">{props.room.name} </h2>
          <h5 className="ml-3"> {props.room.participants.length} members</h5>
          <InviteUsers />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={9} className="whiteBoard">
          <WhiteBoard />
          <WhiteBoardOption />
        </Col>
        <Col xs={3} className="chatBox d-flex flex-column justify-content-end">
          <ChatList />
          <SendMessage />
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
