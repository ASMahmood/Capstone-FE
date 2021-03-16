import React, { useEffect } from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { reduxStore } from "../../types/reduxInterface";
import { MatchParams } from "../../types/routerDomInterfaces";
import { populateRoomDispatch } from "../../types/dispatchInterfaces";
import { fetchRoom } from "../../functions/api";
import { RouteComponentProps } from "react-router-dom";

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
    const getAndPopulateRoom = async () => {
      const response = await fetchRoom(props.match.params.id);
      if (Object.keys(response).length > 1) {
        props.populateRoom(response);
      } else {
        console.log("error! in da matrix");
      }
    };
    getAndPopulateRoom();
  }, []);
  return (
    <Container fluid className="roomBody">
      <Row>
        <Col xs={12} className="roomNavTop">
          {props.room.name}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={9} className="whiteBoard"></Col>
        <Col xs={3} className="chatBox"></Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
