import React from "react";
import { Nav, Navbar, Form, Button } from "react-bootstrap";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
        <Form inline>
          <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-warning">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
