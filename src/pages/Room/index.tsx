import React, { useEffect } from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { reduxStore } from "../../types/reduxInterface";
import { MatchParams } from "../../types/routerDomInterfaces";
import { populateRoomDispatch } from "../../types/dispatchInterfaces";
import { fetchRoom } from "../../functions/api";
import WhiteBoard from "../../components/WhiteBoard";
import { RouteComponentProps } from "react-router-dom";

const mapStateToProps = (state: reduxStore) => state;

function RoomPage(props: reduxStore) {
  return (
    <Container fluid className="roomBody">
      <Row>
        <Col xs={12} className="roomNavTop">
          {props.room.name}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={9} className="whiteBoard">
          <WhiteBoard />
        </Col>
        <Col xs={3} className="chatBox"></Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps)(RoomPage);
