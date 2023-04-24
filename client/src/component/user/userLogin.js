import React, { useState } from "react";
import "./UserLogin.css"; // Import CSS styles
import { useNavigate } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem("token");

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

  function validateForm() {
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Please enter your username and password");
      return false;
    }
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
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
      history(`/user/homepage`); //tek useri me kon useri?prej tokeni?
      window.location.reload();
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
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label>
          <div className="label-text">Password:</div>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
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
