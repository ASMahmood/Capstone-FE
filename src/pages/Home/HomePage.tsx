import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./HomePage.css";

function HomePage() {
  return (
    <Container className="homeBody">
      <Row>
        <Col xs={12} className="userBox"></Col>
      </Row>
      <Row className="mt-4">
        <Col xs={3} className="roomList"></Col>
        <Col xs={9} className="pl-5">
          <Row>
            <Col xs={12} className="createRoom"></Col>
          </Row>
          <Row className="mt-4">
            <Col xs={6} className="friendList"></Col>
            <Col xs={{ span: 5, offset: 1 }} className="randoMeme"></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
