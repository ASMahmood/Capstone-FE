import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./HomePage.css";

function HomePage() {
  return (
    <Container className="homeBody">
      <Row>
        <Col
          xs={12}
          className="userBox d-flex justify-content-center align-items-center"
        >
          <h3>USER INFO</h3>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col
          xs={3}
          className="roomList d-flex justify-content-center align-items-center text-center"
        >
          <h3>ROOM LIST</h3>
        </Col>
        <Col xs={9} className="pl-5">
          <Row>
            <Col
              xs={12}
              className="createRoom d-flex justify-content-center align-items-center"
            >
              <h3>CREATE ROOM</h3>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col
              xs={6}
              className="friendList d-flex justify-content-center align-items-center"
            >
              {" "}
              <h3>FRIEND LIST</h3>
            </Col>
            <Col
              xs={5}
              className="randoMeme ml-4 d-flex justify-content-center align-items-center text-center"
            >
              {" "}
              <h3>RANDOM MEME OR FACT</h3>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
