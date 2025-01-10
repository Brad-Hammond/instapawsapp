import React from "react";

const LogInForm = () => {
  return (
    <div>
      <h1>Log In</h1>
      <form>
        <input type="text" name="username" placeholder="Enter username" />
        <input type="password" name="password" placeholder="Enter password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LogInForm;
