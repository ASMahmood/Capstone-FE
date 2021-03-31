import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import { reduxStore } from "../types/reduxInterface";
import { editProfilePic } from "../functions/api";
import "./styles/UserBox.css";

const mapStateToProps = (state: reduxStore) => state;

function UserBox(props: reduxStore) {
  const [editProfile, setEdit] = useState<boolean>(false);

  const handleChange = async (image: File) => {
    await editProfilePic(image);
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
        <h3 className="mt-3">Hello there, {props.user.username}</h3>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(UserBox);
