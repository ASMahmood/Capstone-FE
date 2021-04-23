import React, { useState } from "react";
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
import logo from "../logo1.png";

function NavBar(props: RouteComponentProps) {
  const dispatch = useDispatch();
  const [searching, setSearching] = useState<boolean>(false);
  return (
    <Navbar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-flex justify-content-center align-items-center w-100">
          <div
            className="navDiv  d-flex flex-column align-items-center justify-content-center"
            onClick={async () => {
              await logoutUser();
              props.history.push("/login");
            }}
          >
            <AiOutlineLogout fontSize="18" />
            <span className="nav-link py-0">Alerts</span>
          </div>
          <div
            className="navDiv ml-5  d-flex flex-column align-items-center justify-content-center"
            onClick={async () => {
              await dispatch({ type: "TOGGLE_LOADING", payload: true });
              props.history.push("/");
              if (props.location.pathname === "/")
                dispatch({ type: "TOGGLE_LOADING", payload: false });
            }}
          >
            <AiOutlineHome fontSize="18" />
            <span className="nav-link py-0">Home</span>
          </div>

          <div
            className="navDiv  navLogo mt-4 ml-5 d-flex flex-column align-items-center justify-content-center"
            onClick={async () => {
              await dispatch({ type: "TOGGLE_LOADING", payload: true });
              props.history.push("/");
            }}
          >
            <img src={logo} alt="logo" width="120px" />
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

          <div
            className={
              searching
                ? "expandedNavDiv navDiv ml-5 d-flex align-items-center justify-content-center"
                : "navDiv ml-5 d-flex align-items-center justify-content-center"
            }
          >
            <div
              className="searchLogo d-flex flex-column align-items-center justify-content-center"
              onClick={async () => {
                searching ? setSearching(false) : setSearching(true);
              }}
            >
              <AiOutlineLogout fontSize="18" />
              <span className="nav-link py-0">Search</span>
            </div>

            <Form.Control
              type="text"
              className={
                searching ? "searchbarInput" : "searchbarInput hiddenInput"
              }
            />
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
