import React, { useEffect } from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { reduxStore } from "../../types/reduxInterface";
import WhiteBoard from "../../components/WhiteBoard";
import WhiteBoardOption from "../../components/WhiteBoardOptions";
import { leaveRoom } from "../../functions/socket";

const mapStateToProps = (state: reduxStore) => state;

function RoomPage(props: reduxStore) {
  useEffect(() => {
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
        <Col xs={12} className="roomNavTop">
          {props.room.name}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={9} className="whiteBoard">
          <WhiteBoard />
          <WhiteBoardOption />
        </Col>
        <Col xs={3} className="chatBox"></Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps)(RoomPage);
