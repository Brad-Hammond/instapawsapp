import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/SignupLogIn.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate, Link } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { Container, Row, Col, Form, Button, Alert, Image } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const LogInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [, setCookie] = useCookies(["refreshTokenTimestamp"]);

  const handleChange = (e) => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };

  const setAuthToken = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    setCookie("refreshTokenTimestamp", refreshTokenTimestamp);
    setCookie("profile_id", data?.user.profile_id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", logInData);
      setCurrentUser(data.user);
      setAuthToken(data);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data || { non_field_errors: ["Login failed"] });
    }
  };

  return (
    <Row className={styles.Row}>
      <Col className={styles.Col}>
        <Container>
          <h1 className={styles.Header}>
            Log In <RiLockPasswordLine />
          </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                onChange={handleChange}
                className={styles.Input}
                type="text"
                placeholder="Enter username"
                name="username"
                value={logInData.username}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="danger" className={styles.AlertStyles} key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                className={styles.Input}
                type="password"
                placeholder="Enter password"
                name="password"
                value={logInData.password}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert variant="danger" className={styles.AlertStyles} key={idx}>
                {message}
              </Alert>
            ))}
            <Button
              className={`${styles.LogInSignUpButton}`}
              type="submit"
            >
              Log In
            </Button>
          </Form>
        </Container>

        <Container className="mb-5">
          <Link
            className={`${styles.Link} mt-4 font-weight-bold`}
            to="/signup"
          >
            Don't have an account? Click here to sign up!
          </Link>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert variant="danger" className={styles.AlertStyles} key={idx}>
              {message}
            </Alert>
          ))}
        </Container>
        <Col className="text-center">
          <Image
            alt="Cartoon Fitness blog login image"
            className={`${styles.LoginImage}`}
            src={
              "https://res.cloudinary.com/dpdhjt0cf/image/upload/v1736519045/New-Main-1254140_yaomfl.jpg"
            }
          />
        </Col>
      </Col>
    </Row>
  );
};

export default LogInForm;
