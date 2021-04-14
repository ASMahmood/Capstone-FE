import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import "./HomePage.css";
import { fetchMe, fetchRandomMeme } from "../../functions/api";
import { fetchUserInfo } from "../../functions/other";
import { reduxStore } from "../../types/reduxInterface";
import {
  populateUserDispatch,
  loaderDispatch,
} from "../../types/dispatchInterfaces";
import UserBox from "../../components/UserBox";
import CreateRoom from "../../components/CreateRoom";
import RoomList from "../../components/RoomList";
import FriendList from "../../components/FriendList";

type homePageProps = reduxStore &
  RouteComponentProps &
  populateUserDispatch &
  loaderDispatch;

const mapStateToProps = (state: reduxStore) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  populateUser: (user: object) =>
    dispatch({
      type: "POPULATE_USER",
      payload: user,
    }),
  toggleLoader: (current: boolean) =>
    dispatch({ type: "TOGGLE_LOADING", payload: current }),
});

function HomePage(props: homePageProps) {
  const [img, setImg] = useState<string>("");

  useEffect(() => {
    const checkIfOnline = async () => {
      const response = await fetchUserInfo();
      if (response) {
        const user = await fetchMe();
        await props.populateUser(user);
        await fetchAndAssignImg();
        props.toggleLoader(false);
      } else {
        props.history.push("/login");
        props.toggleLoader(false);
      }
    };
    checkIfOnline();
  }, []);

  const fetchAndAssignImg = async () => {
    let source = await fetchRandomMeme();
    console.log(source);
    setImg(source);
  };

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
          <RoomList />
        </Col>
        <Col xs={9} className="pl-5">
          <Row>
            <Col
              xs={12}
              className="createRoom d-flex justify-content-center align-items-center"
            >
              <CreateRoom />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col
              xs={6}
              className="friendList d-flex justify-content-center align-items-center"
            >
              <FriendList />
            </Col>
            <Col xs={6} className="pr-0">
              <div className="randoMeme d-flex justify-content-center align-items-center text-center">
                {img && (
                  <img src={img} alt="randomMeme" className="randoMemeImg" />
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
