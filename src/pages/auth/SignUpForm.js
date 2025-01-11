import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";
import styles from "../../styles/SignupLogIn.module.css";
import btnStyles from "../../styles/HomePage.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import { TbUserPlus } from "react-icons/tb";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

const SignUpForm = () => {
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

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
      history.push("/login");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
    >
      <Row className={styles.Row}>
        <Col className={`${styles.Col} text-center`}>
          <Container>
            <h1 className={styles.Header}>
              Sign Up <TbUserPlus />
            </h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="username"
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
                  placeholder="password"
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
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="confirm password"
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
                Create account!
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
              Have an account? Click here to log in.
            </Link>
          </Container>
          <Container>
            <Col className="text-center">
              <Image
                alt="Cartoon Fitness blog sign up image"
                className={`${styles.LoginImage} text-center`}
                src={
                  "https://res.cloudinary.com/drhfh23tl/image/upload/v1679416297/login-img_hqathg.png"
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
