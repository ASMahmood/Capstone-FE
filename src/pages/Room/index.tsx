import React from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";

export default function RoomPage() {
  return (
    <Container fluid className="roomBody">
      <Row>
        <Col xs={12} className="roomNavTop"></Col>
      </Row>
      <Row className="mt-4">
        <Col xs={9} className="whiteBoard"></Col>
        <Col xs={3} className="chatBox"></Col>
      </Row>
    </Container>
  );
}
