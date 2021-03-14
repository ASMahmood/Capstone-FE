import React, { useState } from "react";
import "./style.css";
import { Container, Row, Col, Form } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [extraInfo, setExtra] = useState<boolean>(false);
  return (
    <Container className="loginBody">
      <Row>
        <Col xs={12} className="centerForm">
          <Form className="mt-4">
            <Form.Group as={Row}>
              <Form.Label column xs="2" className="text-right  pr-0">
                Email
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder="SoulMan69@aol.jp"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column xs="2" className="text-right  pr-0">
                Password
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Please use at least 9 characters. We won't force you though."
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
