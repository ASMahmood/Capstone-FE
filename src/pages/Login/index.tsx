import React, { useState, useEffect } from "react";
import "./style.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { loginUser, registerUser, setProfilePic } from "../../functions/api";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../logo1.png";

export default function Login(props: RouteComponentProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [extraInfo, setExtra] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const dispatch = useDispatch();

  const loginRequest = async () => {
    const response = await loginUser(email, password);
    console.log(response);
    if (response.message === "logged in") {
      dispatch({ type: "TOGGLE_LOADING", payload: true });
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
        dispatch({ type: "TOGGLE_LOADING", payload: false });
        props.history.push("/login");
      } else {
        setExtra(false);
        dispatch({ type: "TOGGLE_LOADING", payload: false });
        props.history.push("/login");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "TOGGLE_LOADING", payload: true });
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      loginRequest();
    }
    setValidated(true);
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hey");
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      registerRequest();
    }
    setValidated(true);
  };

  useEffect(() => {
    dispatch({ type: "TOGGLE_LOADING", payload: false });
  }, []);

  return (
    <Container className="loginBody centerForm">
      <Row>
        <Col xs={12}>
          <h2 className="loginTitle mt-2 text-center">
            {extraInfo ? "New Here?" : "Welcome"}
          </h2>
          <h6 className="loginSubTitle mt-2 mb-3 text-center">
            {extraInfo ? "Lets make you an account!" : "Please login"}
          </h6>
        </Col>
      </Row>
      <Row>
        <Col id="loginColLeft" xs={4}>
          <img src={logo} className={extraInfo ? "moveLogo" : ""} alt="logo" />
        </Col>
        <Col xs={8}>
          <Form
            className="mt-4"
            onSubmit={extraInfo ? handleRegisterSubmit : handleSubmit}
            noValidate
            validated={validated}
          >
            <Form.Group as={Row}>
              <Form.Label column xs="3" className="text-start  pr-0">
                Email
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  required
                  type="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  placeholder="SoulMan69@aol.jp"
                />
                <Form.Control.Feedback type="invalid">
                  This needs to be a valid email address!
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column xs="3" className="text-start   pr-0">
                Password
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  required
                  type="password"
                  autoComplete="off"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Please use at least 8 characters."
                />
                <Form.Control.Feedback type="invalid">
                  Password needs to be at least 8 characters!
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            {extraInfo && (
              <>
                <Form.Group as={Row}>
                  <Form.Label column xs="3" className="text-start pr-0">
                    Username
                  </Form.Label>
                  <Col xs={9}>
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

                <div className="imagePreview mb-3">
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : "https://res.cloudinary.com/dhmw620tl/image/upload/v1611908556/benchmark3/bv7p7h0vfartmryjrxyp.png"
                    }
                    alt="preview"
                  />
                </div>
              </>
            )}
            <p className="loginSmallText">Forgotten Password?</p>
            <span
              className="loginSmallText"
              onClick={() => (extraInfo ? setExtra(false) : setExtra(true))}
            >
              {extraInfo
                ? "Want to try to login again?"
                : "New Here? Click to register!"}
            </span>

            <Form.Group className="mt-3" as={Row}>
              <Col xs={12} className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className="loginPageButton"
                  variant="outline-warning"
                >
                  {extraInfo ? "REGISTER" : "LOGIN"}
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
