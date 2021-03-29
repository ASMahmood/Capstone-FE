import React, { useEffect, useState } from "react";
import "./style.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Dispatch } from "redux";
import { reduxStore } from "../../types/reduxInterface";
import {
  populateRoomDispatch,
  populateUserDispatch,
} from "../../types/dispatchInterfaces";
import { MatchParams } from "../../types/routerDomInterfaces";
import { leaveRoom } from "../../functions/socket";
import { fetchUserInfo } from "../../functions/other";
import { fetchRoom, addUserToRoom, fetchMe } from "../../functions/api";
import WhiteBoard from "../../components/WhiteBoard";
import WhiteBoardOption from "../../components/WhiteBoardOptions";
import ChatList from "../../components/ChatList";
import SendMessage from "../../components/SendMessage";
import InviteUsers from "../../components/InviteUsers";

type roomProps = reduxStore &
  populateRoomDispatch &
  populateUserDispatch &
  RouteComponentProps<MatchParams>;

const mapStateToProps = (state: reduxStore) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  populateRoom: (room: object) =>
    dispatch({
      type: "POPULATE_ROOM",
      payload: room,
    }),
  populateUser: (user: object) =>
    dispatch({
      type: "POPULATE_USER",
      payload: user,
    }),
});

function RoomPage(props: roomProps) {
  const [joining, setJoin] = useState<boolean>(false);

  useEffect(() => {
    const checkIfOnline = async () => {
      const response = await fetchUserInfo();
      if (response) {
        const user = await fetchMe();
        props.populateUser(user);
      } else {
        props.history.push("/login");
      }
    };
    checkIfOnline();
    let searchParams = new URLSearchParams(props.location.search);
    if (searchParams.get("join")) {
      setJoin(true);
    }
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

  const handleJoin = async (e: React.MouseEvent) => {
    e.preventDefault();
    let res = await addUserToRoom(props.room._id, props.user._id);
    if (res.message === "authorized") {
      setJoin(false);
    }
  };
  return (
    <Container fluid className="roomBody">
      <Row>
        <Col xs={12} className="roomNavTop d-flex align-items-center">
          <h2 className="m-0">{props.room.name} </h2>
          <h5 className="ml-3"> {props.room.participants.length} members</h5>
          {joining ? (
            <Button
              className="ml-auto"
              onClick={(e) => handleJoin(e)}
              variant="secondary"
            >
              JOIN
            </Button>
          ) : (
            <InviteUsers />
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        {joining ? (
          <Col
            xs={12}
            className="whiteBoard p-3 d-flex justify-content-center align-items-center text-center"
          >
            <h1>Please join this room to see its contents</h1>
          </Col>
        ) : (
          <>
            <Col xs={9} className="whiteBoard">
              <WhiteBoard />
              <WhiteBoardOption />
            </Col>
            <Col
              xs={3}
              className="chatBox d-flex flex-column justify-content-end"
            >
              <ChatList />
              <SendMessage />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
