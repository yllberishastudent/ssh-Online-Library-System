import React, { useState } from "react";
import "./style/UserRegister.css"; // Import CSS styles
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const history = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");


  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = "Required";
      } else if (!/^[a-zA-Z0-9]{3,}$/.test(values.username)) {
        errors.username =
          "Username must contain at least 3 alphanumeric characters";
      }

      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Please enter a valid email address";
      }

      if (!values.phone_number) {
        errors.phone_number = "Required";
      } else if (!/^\+?[0-9]{8,}$/.test(values.phone_number)) {
        errors.phone_number = "Please enter a valid phone number";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(values.password)) {
        errors.password =
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long";
      }

      if (!values.confirm_password) {
        errors.confirm_password = "Required";
      } else if (values.confirm_password !== values.password) {
        errors.confirm_password = "Passwords do not match";
      }

      return errors;
    },
    onSubmit: (values, { setSubmitting, setFieldError }) => {
      axios
        .post("/auth/signup", values, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "Custom-Header": "value",
          },
        })
        .then((response) => {
          console.log("Registration successful");
          setSubmitting(true);
          setSuccessMessage("Registration successful, please wait....")
          setTimeout(() => {
            history("/user/login");
          }, 3000);
        })
        .catch((error) => {
          setSubmitting(false);
          if (error.response) {
            const data = error.response.data;
            if (data.message === "Username already exists") {
              setFieldError("username", "Username is already taken");
            } else if (data.message === "Email has already been used") {
              setFieldError("email", "Email is already used");
            } else {
              setFieldError(
                "password",
                "Registration failed, please try again or contact support for assistance"
              );
            }
          } else {
            setFieldError(
              "password",
              "Registration failed, please try again or contact support for assistance"
            );
          }
        });
    },
  });

  return (
    <div className="register-wrap">
      <form onSubmit={formik.handleSubmit} className="register-form">
        <label>
          <div className="label-text">Username:</div>
          <input
            type="text"
            placeholder="Enter Username"
            {...formik.getFieldProps("username")}
          />
           {formik.touched.username && formik.errors.username && (
          <div className="error-message">{formik.errors.username}</div>
        )}
        </label>
        <label>
          <div className="label-text">Email:</div>
          <input
            type="text"
            placeholder="Enter Email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </label>
        <label>
          <div className="label-text">Phone Number:</div>
          <input
            type="text"
            placeholder="Enter Phone Number"
            {...formik.getFieldProps("phone_number")}
          />
          {formik.touched.phone_number && formik.errors.phone_number && (
            <div className="error-message">{formik.errors.phone_number}</div>
          )}
        </label>

        <label>
          <div className="label-text">Password:</div>
          <input
            type="password"
            placeholder="Enter Password"
            {...formik.getFieldProps("password")}
          />

          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </label>

        <label>
          <div className="label-text">Confirm Password:</div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...formik.getFieldProps("confirm_password")}
          />
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              <div className="error-message">
                {formik.errors.confirm_password}
              </div>
            )}
        </label>

        <button type="submit" disabled={formik.isSubmitting}>
          Register
        </button>
        <a href="/user/login" className="login">
          Already have an account? Log in!
        </a>
        <p className="success-message">{successMessage}</p>
      </form>
    </div>
  );
}

export default UserRegister;
