import React from "react";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineLogout,
} from "react-icons/ai";
import "./styles/NavBar.css";

function NavBar() {
  return (
    <Navbar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-flex justify-content-center w-100">
          <Link to="/">
            <div className="navDiv d-flex flex-column align-items-center justify-content-center ">
              <AiOutlineHome fontSize="18" />
              <span className="nav-link py-0">Home</span>
            </div>
          </Link>
          <Link to="/login">
            <div className="navDiv ml-5 d-flex flex-column align-items-center justify-content-center ">
              <AiOutlineLogout fontSize="18" />
              <span className="nav-link py-0">Logout</span>
            </div>
          </Link>
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

export default NavBar;
