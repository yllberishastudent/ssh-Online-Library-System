import React, { useState } from "react";
import "./style/UserLogin.css"; // Import CSS styles
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Formik, Form, Field, ErrorMessage } from "formik";


function UserLogin() {
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(values, { setSubmitting }) {
    try {
      const response = await axios.post(
        "/auth/login",
        {
          username: values.username,
          password: values.password,
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
      const decodedToken = jwt_decode(response.data.token);
      const userRole = decodedToken.role;

      if (userRole === "admin") {
        history("/user/admin");
      } else if (userRole === "member") {
        history("/user/homepage");
      } else {
        console.error("Unknown user role:", userRole);
      }
      window.location.reload();
    } catch (error) {
      setErrorMessage("Incorrect username or password");
    }
  }

  return (
    <div className="login-wrap">
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.username.trim()) {
            errors.username = "Please enter your username";
          }
          if (!values.password.trim()) {
            errors.password = "Please enter your password";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        <Form className="login-form">
          <label>
            <div className="label-text">Username:</div>
            <Field
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
            />
            <ErrorMessage name="username" component="div" className="error" />
          </label>
          <label>
            <div className="label-text">Password:</div>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </label>
          <div className="forgot-password__wrapper">
            <a href="/user/email" className="forgot-password">
              Forgot password?
            </a>
          </div>
          <button type="submit">Log in</button>
          <ErrorMessage name="errorMessage" component="p" className="error" />
          {errorMessage && <p className="error">{errorMessage}</p>}

          <a href="/user/register" className="register">
            No account? Sign up here
          </a>
        </Form>
      </Formik>
    </div>
  );
}

export default UserLogin;
