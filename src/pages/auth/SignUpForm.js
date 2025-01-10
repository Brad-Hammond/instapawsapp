import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/SignupLogIn.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import { TbUserPlus } from "react-icons/tb";
import { Container, Row, Col, Form, Button, Alert, Image } from "react-bootstrap";

const SignUpForm = () => {
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});

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
            <Button className={styles.LogInSignUpButton} type="submit">
              Create Account
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
