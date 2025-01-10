import React, { useState } from "react";

const LogInForm = () => {
  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Log In</h1>
      <form>
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
    </div>
  );
};

export default LogInForm;
