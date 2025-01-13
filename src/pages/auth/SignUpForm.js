import React, { useState, useRef } from "react"; // Added useRef
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";
import styles from "../../styles/SignupLogIn.module.css";
import btnStyles from "../../styles/HomePage.module.css";
import { CSSTransition } from "react-transition-group";
import { TbUserPlus } from "react-icons/tb";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
/*
  SignUpForm Component
  ---------------------
  - Renders a form for users to create a new account on the application.

  Features:
  - Manages form inputs (`username`, `password1`, `password2`) using local state.
  - Handles form submission:
    1. Sends signup data to the API.
    2. Redirects to the login page upon successful registration.
    3. Displays error messages dynamically for invalid fields or general issues.
  - Implements smooth fade-in animation using `CSSTransition` with a `nodeRef`.
  - Includes a note for users about the immutability of the username.
  - Provides a link for users to navigate to the login page if they already have an account.
  - Styled with custom classes (`styles` and `btnStyles`) and includes an image for visual appeal.
*/

const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const nodeRef = useRef(null);

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      navigate("/login");
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
      nodeRef={nodeRef}
    >
      <Row className={styles.Row} ref={nodeRef}>
        <Col className={`${styles.Col} text-center`}>
          <Container>
            <h1 className={styles.Header}>
              Sign Up <TbUserPlus />
            </h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                {/* Note added for username */}
                <p className={`${styles.Note} text-muted`}>
                  <small>Please choose your username carefully. It cannot be changed later.</small>
                </p>
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.username?.map((message, idx) => (
                <Alert
                  variant="danger"
                  className={styles.AlertStyles}
                  key={idx}
                >
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Enter password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password1?.map((message, idx) => (
                <Alert
                  variant="danger"
                  className={styles.AlertStyles}
                  key={idx}
                >
                  {message}
                </Alert>
              ))}

              <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password2?.map((message, idx) => (
                <Alert
                  variant="danger"
                  className={styles.AlertStyles}
                  key={idx}
                >
                  {message}
                </Alert>
              ))}

              <Button
                className={`${btnStyles.HomeButton} ${styles.LogInSignUpButton}`}
                type="submit"
              >
                Create Account!
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert
                  variant="danger"
                  className={styles.AlertStyles}
                  key={idx}
                >
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>
          <Container className="mb-5">
            <Link
              className={`${styles.Link} mt-4 font-weight-bold`}
              to="/login"
            >
              Already have an account? Log in here!
            </Link>
          </Container>
          <Container>
            <Col className="text-center">
              <Image
                alt="Dog on leash login image"
                className={`${styles.LoginImage} text-center`}
                src={
                  "https://res.cloudinary.com/dpdhjt0cf/image/upload/v1736519045/New-Main-1254140_yaomfl.jpg"
                }
              />
            </Col>
          </Container>
        </Col>
      </Row>
    </CSSTransition>
  );
};

export default SignUpForm;
