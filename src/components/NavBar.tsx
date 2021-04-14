import React from "react";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { logoutUser } from "../functions/api";
import { useDispatch } from "react-redux";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import "./styles/NavBar.css";

function NavBar(props: RouteComponentProps) {
  const dispatch = useDispatch();
  return (
    <Navbar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-flex justify-content-center w-100">
          <div
            className="navDiv d-flex flex-column align-items-center justify-content-center"
            onClick={async () => {
              await dispatch({ type: "TOGGLE_LOADING", payload: true });
              props.history.push("/");
            }}
          >
            <AiOutlineHome fontSize="18" />
            <span className="nav-link py-0">Home</span>
          </div>

          <div
            className="navDiv ml-5 d-flex flex-column align-items-center justify-content-center"
            onClick={async () => {
              await logoutUser();
              props.history.push("/login");
            }}
          >
            <AiOutlineLogout fontSize="18" />
            <span className="nav-link py-0">Logout</span>
          </div>
        </Nav>
        {/* <Form inline>
          <Form.Control
            type="text"
            id="navbarSearch"
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button variant="secondary">
            <AiOutlineSearch fontSize="22" />
          </Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default withRouter(NavBar);
