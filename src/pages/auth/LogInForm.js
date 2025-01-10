import React, { useState } from "react";
import axios from "axios";
import styles from "../../styles/SignupLogIn.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";

const LogInForm = () => {
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();
  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", logInData);
      setCurrentUser(data.user);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data || { non_field_errors: ["Login failed"] });
    }
  };

  return (
    <div className={styles.Col}>
      <h1 className={styles.Header}>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={logInData.username}
          onChange={handleChange}
          className={styles.Input}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={logInData.password}
          onChange={handleChange}
          className={styles.Input}
        />
        <button type="submit" className={styles.LogInSignUpButton}>Log In</button>
      </form>

      {errors.non_field_errors && (
        <div className={styles.Error}>
          {errors.non_field_errors.map((msg, idx) => <p key={idx}>{msg}</p>)}
        </div>
      )}
    </div>
  );
};

export default LogInForm;
