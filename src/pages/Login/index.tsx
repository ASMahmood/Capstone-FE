import React, { useState } from "react";
import "./style.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { loginUser } from "../../functions/api";
import { RouteComponentProps } from "react-router-dom";

export default function Login(props: RouteComponentProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [image, setImage] = useState<object>();
  const [extraInfo, setExtra] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await loginUser(email, password);
    console.log(response);
    if (response.message === "logged in") {
      props.history.push("/");
    } else {
      setExtra(true);
    }
  };

  return (
    <Container className="loginBody">
      <Row>
        <Col xs={12} className="centerForm">
          <h2 className="loginTitle mt-2 text-center">
            {extraInfo ? "New Here?" : "Welcome Back"}
          </h2>
          {extraInfo && (
            <h6 className="loginSubTitle mt-2 text-center">
              Lets make you an account!
            </h6>
          )}
          <Form className="mt-4" onSubmit={handleSubmit}>
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
            {extraInfo && (
              <>
                <Form.Group as={Row}>
                  <Form.Label column xs="2" className="text-right  pr-0">
                    Username
                  </Form.Label>
                  <Col xs={9}>
                    <Form.Control
                      type="text"
                      autoComplete="off"
                      value={username}
                      onChange={(e) => setUsername(e.currentTarget.value)}
                      placeholder="Others will see you as this."
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="text-center m-0">
                  <Form.Label htmlFor="loginPicSelector">
                    Profile Picture
                  </Form.Label>
                  <Form.File
                    accept="image/*"
                    id="loginPicSelector"
                    className="d-none"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.currentTarget.files !== null) {
                        setImage(e.currentTarget.files[0]);
                      }
                    }}
                  />
                </Form.Group>
                {image && (
                  <div className="imagePreview mb-3">
                    <img src={URL.createObjectURL(image)} alt="preview" />
                  </div>
                )}
              </>
            )}
            <Form.Group as={Row}>
              <Col
                xs={extraInfo ? 6 : 12}
                className="d-flex justify-content-center"
              >
                <Button type="submit" variant="outline-warning">
                  ATTEMPT LOGIN AGAIN
                </Button>
              </Col>
              {extraInfo && (
                <Col xs={6} className="d-flex justify-content-center">
                  <Button type="submit" variant="outline-warning">
                    REGISTER NEW USER
                  </Button>
                </Col>
              )}
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
