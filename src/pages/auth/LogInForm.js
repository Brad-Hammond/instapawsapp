import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/SignupLogIn.module.css";
import btnStyles from "../../styles/HomePage.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import { RiLockPasswordLine } from "react-icons/ri";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const LogInForm = () => {
  const setCurrentUser = useSetCurrentUser();

  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = logInData;
  const [, setCookie] = useCookies(["refreshTokenTimestamp"]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
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
      if (err.response) {
        setErrors(err.response?.data);
      } else {
        setErrors({ non_field_errors: [String(err)] });
      }
      return err;
    }
    return false;
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
    >
      <Row className={styles.Row}>
        <Col className={styles.Col}>
          <Container>
            <h1 className={styles.Header}>
              Log In <RiLockPasswordLine />
            </h1>
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  className={styles.Input}
                  type="text"
                  placeholder="enter username"
                  name="username"
                  value={username}
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
              <Form.Group controlId="password">
                <Form.Label className="d-none">Password </Form.Label>
                <Form.Control
                  onChange={handleChange}
                  className={styles.Input}
                  type="password"
                  placeholder="enter password"
                  name="password"
                  value={password}
                />
              </Form.Group>
              {errors.password?.map((message, idx) => (
                <Alert
                  variant="danger"
                  className={styles.AlertStyles}
                  key={idx}
                >
                  {message}
                </Alert>
              ))}
              <Button
                className={` ${btnStyles.HomeButton} ${styles.LogInSignUpButton}`}
                type="submit"
              >
                Log In!
              </Button>
            </Form>
          </Container>
          <Container className="mb-5">
            <Link
              className={`${styles.Link} mt-4 font-weight-bold`}
              to="/signup"
            >
              Don&apos;t have an account? Click here to sign up!
            </Link>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="danger" className={styles.AlertStyles} key={idx}>
                {message}
              </Alert>
            ))}
          </Container>
          <Col className="text-center">
            <Image
              alt="Dog on leash login image"
              className={`${styles.LoginImage}`}
              src={
                "https://res.cloudinary.com/dpdhjt0cf/image/upload/v1736519045/New-Main-1254140_yaomfl.jpg"
              }
            />
          </Col>
        </Col>
      </Row>
    </CSSTransition>
  );
};

export default LogInForm;
