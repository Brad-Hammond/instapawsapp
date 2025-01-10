import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/SignupLogIn.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { TbUserPlus } from "react-icons/tb"; 
import { Container, Row, Col, Form, Button, Alert, Image } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const SignUpForm = () => {
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const [, setCookie] = useCookies(["refreshTokenTimestamp"]);

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
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
      await axios.post("/dj-rest-auth/registration/", signUpData);
      navigate("/login");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
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
                placeholder="Enter username"
                name="username"
                value={signUpData.username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="danger" className={styles.AlertStyles} key={idx}>
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
                value={signUpData.password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="danger" className={styles.AlertStyles} key={idx}>
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
                value={signUpData.password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert variant="danger" className={styles.AlertStyles} key={idx}>
                {message}
              </Alert>
            ))}

            <Button
              className={`${styles.LogInSignUpButton} ${styles.HomeButton}`}
              type="submit"
            >
              Create Account
            </Button>
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
              alt="Sign up illustration"
              className={`${styles.LoginImage}`}
              src="https://res.cloudinary.com/dpdhjt0cf/image/upload/v1736519045/New-Main-1254140_yaomfl.jpg"
            />
          </Col>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
