import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AiOutlineEdit, AiOutlineSend } from "react-icons/ai";
import { FaPalette } from "react-icons/fa";
import { reduxStore } from "../types/reduxInterface";
import { populateUserDispatch } from "../types/dispatchInterfaces";
import { editProfileFetch, editProfilePic } from "../functions/api";
import { userWhiteboard } from "../functions/whiteboard";
import "./styles/UserBox.css";

type userBoxProps = reduxStore & populateUserDispatch;

const mapStateToProps = (state: reduxStore) => state;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  populateUser: (user: object) =>
    dispatch({
      type: "POPULATE_USER",
      payload: user,
    }),
});

function UserBox(props: userBoxProps) {
  const [editProfile, setEdit] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(props.user.username);

  useEffect(() => {
    setTimeout(() => {
      userWhiteboard();
    }, 1000);
  }, []);

  const handleChange = async (image: File) => {
    let updatedUser = await editProfilePic(image);
    props.populateUser(updatedUser);
  };

  const handleUsername = async () => {
    let updatedUser = await editProfileFetch(username);
    await props.populateUser(updatedUser);
    setEdit(false);
    setUsername(props.user.username);
  };

  return (
    <div className="userInfo w-100 h-100 d-flex align-items-center justify-content-left">
      <Form>
        <Form.Group>
          <Form.Label htmlFor="ProfilePicSelector">
            <img
              src={props.user.profilePic}
              alt="profile"
              className="homePagePic mx-4"
            />
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            id="ProfilePicSelector"
            className="filePickerInput"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.currentTarget.files !== null) {
                handleChange(e.currentTarget.files[0]);
              }
            }}
          />
        </Form.Group>
      </Form>
      <div className="textBox align-content-top">
        <h3 className="mt-3 d-flex align-items-center">
          Hello there,{" "}
          {editProfile ? (
            <Form.Control
              required
              type="text"
              className="editUsernameInput"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              placeholder="New Username?"
            />
          ) : (
            props.user.username
          )}{" "}
          <AiOutlineEdit
            id="homepageEdit"
            className="ml-3 editIcon"
            onClick={() => (editProfile ? setEdit(false) : setEdit(true))}
          />
          {editProfile ? (
            <>
              <Form.Label className="ml-4" htmlFor="homepageColorPicker">
                <FaPalette fontSize="20" className="editIcon" />
              </Form.Label>
              <Form.Control type="color" id="homepageColorPicker" />
              <AiOutlineSend
                className="ml-3 editIcon"
                onClick={() => handleUsername()}
              />
            </>
          ) : (
            <></>
          )}
        </h3>
        <div id="userWhiteboard">
          <canvas id="userCanvas"></canvas>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);
