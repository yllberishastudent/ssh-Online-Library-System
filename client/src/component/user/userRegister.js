import React, { useState } from "react";
import "./UserRegister.css"; // Import CSS styles
import axios from "axios";

function UserRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  function handleUsernameChange(event) {
    setUsername(event.target.value);

    // -- DUHET MI VALIDU, BOHEN SI QIKJO TAJ PER SECILEN.
    // const { value } = event.target;
    // setEmail(value);

    // // Validate email using regex
    // const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!pattern.test(value)) {
    //   setEmailError("Please enter a valid email address");
    // } else {
    //   setEmailError("");
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleNumberChange(event) {
    setNumber(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirm_password) {
      alert("Passwords do not match");
      return;
    }

    // Send request to server using Axios
    axios.post("/signup", {
      username,
      email,
      phone_number,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Custom-Header": "value",
      },
    })
      .then((response) => {
        console.log("Registration successful");
        alert(
          "Registration successful... Also fix this so that it does smth cool (aka move to another page)"
        );
        // Add any desired behavior on successful registration
      })
      .catch((error) => {
        console.error(error);
        alert(
          'Registration failed,  Ka edhe Error te JSON e bjen ni message munesh me perdor qata se psh useri already exists ose najsen PHS MESSAGE: "ERRORI I CAKTUM " '
        );
        // Add any desired behavior on failed registration
      });
  }

  return (
    <div className="register-wrap">
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          <div className="label-text">Username:</div>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          <div className="label-text">Email:</div>
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          <div className="label-text">Phone Number:</div>
          <input
            type="text"
            value={phone_number}
            onChange={handleNumberChange}
          />
        </label>
        <label>
          <div className="label-text">Password:</div>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <label>
          <div className="label-text">Confirm Password:</div>
          <input
            type="password"
            value={confirm_password}
            onChange={handleConfirmPasswordChange}
          />
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserRegister;
