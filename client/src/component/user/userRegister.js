import React, { useState } from "react";
import "./style/UserRegister.css"; // Import CSS styles
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [failedRegister,setError]=useState("");
  const [succesfulRegister,setSuccess]=useState("");
  const history = useNavigate();

  function handleUsernameChange(event) {
  setUsername(event.target.value);
  setUsernameError("");
  const pattern = /^[a-zA-Z0-9]{3,}$/;
  if (!pattern.test(event.target.value)) {
    setUsernameError("Username must contain at least 3 alphanumeric characters");
  }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setPasswordError("");
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!pattern.test(event.target.value)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long"
      );
    }
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);

  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setEmailError("");
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(event.target.value)) {
      setEmailError("Please enter a valid email address");
    }
  }

  function handleNumberChange(event) {
    setNumber(event.target.value);
    setPhoneError("");
    const pattern = /^\+?[0-9]{8,}$/;
    if (!pattern.test(event.target.value)) {
      setPhoneError("Please enter a valid phone number");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!username || !email || !phone_number || !password || !confirm_password) {
      setError("Please fill in all required fields");
      return;
    } else  if (usernameError || emailError || phoneError || passwordError) {
      setError("Please enter the correct information");
      return;
    }
     // Check if there are any validation errors
    
    // Check if passwords match
    if (password !== confirm_password) {
      alert("Passwords do not match");
      return;
    }

    // Send request to server using Axios
    axios.post("/auth/signup", {
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
        setSuccess("Registration successful");
        setTimeout(() => {
          history("/user/login");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          const data = error.response.data;
          if (data.message === "Username already exists") {
            setError("Username is already taken");
          } else if (data.message === "Email has already been used") {
            setError("Email is already used");
          } else {
            setError(
              "Registration failed, please try again or contact support for assistance"
            );
          }
        } else {
          setError(
            "Registration failed, please try again or contact support for assistance"
          );
        }
      });
  }

  return (
    <div className="register-wrap">
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          <div className="label-text">Username:</div>
          <input type="text" placeholder="Enter Username" value={username} onChange={handleUsernameChange} />
           <div className="error-message">{usernameError}</div>
        </label>
        <label>
          <div className="label-text">Email:</div>
          <input type="text"  placeholder="Enter Email" value={email} onChange={handleEmailChange} />
        </label>
        <div className="error-message">{emailError}</div>
        <label>
          <div className="label-text">Phone Number:</div>
          <input
            type="text"
            value={phone_number}
            placeholder="Enter Phone Number"
            onChange={handleNumberChange}
          />
           <div className="error-message">{phoneError}</div>
        </label>
        
        
        <label>
          <div className="label-text">Password:</div>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
          />
             <div className="error-message">{passwordError}</div>
        </label>
     
        <label>
          <div className="label-text">Confirm Password:</div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm_password}
            onChange={handleConfirmPasswordChange}
          />
        </label>
        <div className="error-message">{failedRegister}</div>
        <div className="error-message">{succesfulRegister}</div>
        <button type="submit">Register</button>
        <a href="/user/login" class="login">Already have an account? Log in!</a>
      </form>
    </div>
  );
}

export default UserRegister;
