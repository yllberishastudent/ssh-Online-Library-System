import React, { useState } from "react";
import "./UserLogin.css"; // Import CSS styles
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(`Submitting username ${username} and password ${password}`);
    try {
      const response = await axios.post(
        "/login",
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Custom-Header": "value",
          },
        }
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token); // save token to local storage
      history("/user/homepage");
    } catch (error) {
      console.error(error);
      setErrorMessage("Incorrect username or password");
    }
  }

  return (
    <div className="login-wrap">
      <form onSubmit={handleSubmit} className="login-form" method="POST">
        <label>
          <div className="label-text">Username:</div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          <div className="label-text">Password:</div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Log in</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default UserLogin;
