import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import "./HomePage.css";
import { fetchMe } from "../../functions/api";
import { fetchUserInfo } from "../../functions/other";
import { reduxStore } from "../../types/reduxInterface";
import { populateUserDispatch } from "../../types/dispatchInterfaces";
import UserBox from "../../components/UserBox";

type homePageProps = reduxStore & RouteComponentProps & populateUserDispatch;

const mapStateToProps = (state: reduxStore) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  populateUser: (user: object) =>
    dispatch({
      type: "POPULATE_USER",
      payload: user,
    }),
});

function HomePage(props: homePageProps) {
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
  }, []);

  return (
    <Container className="homeBody">
      <Row>
        <Col
          xs={12}
          className="userBox d-flex justify-content-center align-items-center"
        >
          <UserBox />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
