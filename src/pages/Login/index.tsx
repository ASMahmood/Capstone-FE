import React, { useState } from "react";
import "./style.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { loginUser, registerUser, setProfilePic } from "../../functions/api";
import { RouteComponentProps } from "react-router-dom";

export default function Login(props: RouteComponentProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [extraInfo, setExtra] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  const loginRequest = async () => {
    const response = await loginUser(email, password);
    console.log(response);
    if (response.message === "logged in") {
      props.history.push("/");
    } else {
      setExtra(true);
    }
  };

  const registerRequest = async () => {
    const response = await registerUser(email, password, username);
    console.log(response);
    if (response.message === "user registered!") {
      if (image !== undefined) {
        await setProfilePic(response.message, image);
        setExtra(false);
        props.history.push("/login");
      } else {
        setExtra(false);
        props.history.push("/login");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      loginRequest();
    }
    setValidated(true);
  };

  const handleRegisterSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      registerRequest();
    }
    setValidated(true);
  };

  return (
    <Container className="loginBody">
      <Row>
        <Col xs={12} className="centerForm">
          <h2 className="loginTitle mt-2 text-center">
            {extraInfo ? "New Here?" : "Welcome"}
          </h2>
          {extraInfo && (
            <h6 className="loginSubTitle mt-2 text-center">
              Lets make you an account!
            </h6>
          )}
          <Form
            className="mt-4"
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <Form.Group as={Row}>
              <Form.Label column xs="12" sm="2" className="text-center  pr-0">
                Email
              </Form.Label>
              <Col xs={12} sm={9}>
                <Form.Control
                  required
                  type="text"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder="SoulMan69@aol.jp"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column xs="12" sm="2" className="text-center  pr-0">
                Password
              </Form.Label>
              <Col xs={12} sm={9}>
                <Form.Control
                  required
                  type="password"
                  autoComplete="off"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Please use at least 9 characters. We won't force you though."
                />
                <Form.Control.Feedback type="invalid">
                  Password needs to be at least 8 characters!
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            {extraInfo && (
              <>
                <Form.Group as={Row}>
                  <Form.Label
                    column
                    xs="12"
                    sm="2"
                    className="text-center pr-0"
                  >
                    Username
                  </Form.Label>
                  <Col xs={12} sm={9}>
                    <Form.Control
                      required
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
                    required
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
              <Col xs={6} className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="loginPageButton"
                  variant="outline-warning"
                >
                  {extraInfo ? "ATTEMPT LOGIN AGAIN" : "LOGIN"}
                </Button>
              </Col>

              <Col xs={6} className="d-flex justify-content-center">
                <Button
                  className="loginPageButton"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    extraInfo ? handleRegisterSubmit(e) : setExtra(true)
                  }
                  variant="outline-warning"
                >
                  REGISTER
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
