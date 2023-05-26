import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/Email.css"; // Import the CSS file for Email component

function Email() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setOTPSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [otpVerified, setOTPVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const history = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/auth/password-recovery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("OTP sent successfully");
        setSuccessMessage("OTP sent succesfully");
        setOTPSent(true);
      } else {
        console.error("Failed to send OTP");
        setErrorMessage("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Error sending OTP");
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/auth/otp-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        console.log("OTP verification successful");
        setSuccessMessage("OTP verification succesful");
        setOTPVerified(true);
      } else {
        console.error("OTP verification failed");
        setErrorMessage("OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("Error verifying OTP");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        console.log("Password changed successfully");
        setSuccessMessage("Password changed succesfully, please login");
        history("/user/login");
      } else {
        console.error("Failed to change password");
        setErrorMessage("User with this email does not exist!");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage("Error changing password try again");
    }
  };

  return (
    <div className="email__wrapper">
      <div className="Email">
        <h1 className="email__title">Email OTP</h1>
        {!otpSent ? (
          <form className="email-form" onSubmit={handleEmailSubmit}>
            <label className="label" htmlFor="email">Please enter your email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@org.com"
              required
            />
            <br />
            <br />
            <button type="submit">Send OTP</button>
          </form>
        ) : (
          <form className="otp-form" onSubmit={handleOTPSubmit}>
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
            <br />
            <br />
            <button type="submit">Verify OTP</button>
          </form>
        )}
        {otpVerified && (
          <form
            className="change-password-form"
            onSubmit={handleChangePassword}
          >
            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <br />
            <br />
            <button type="submit">Change Password</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default Email;
