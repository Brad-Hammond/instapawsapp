import React, { useState } from "react";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";

const LogInForm = () => {
  const setCurrentUser = useSetCurrentUser();
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
      console.log("User set:", data.user);
    } catch (err) {
      setErrors(err.response?.data || { non_field_errors: ["Login failed"] });
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={logInData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={logInData.password}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
      {errors.non_field_errors && (
        <div>{errors.non_field_errors.map((msg, idx) => <p key={idx}>{msg}</p>)}</div>
      )}
    </div>
  );
};

export default LogInForm;
