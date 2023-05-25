import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "./style/Privacy.css"; // Import CSS styles

const Privacy = () => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  useEffect(() => {
    // Fetch user information based on the JWT token stored in local storage
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        const id = decodedToken.id;

        const response = await axios.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchUser();
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleVerifyPassword = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const username = decodedToken.username;
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUpdateError(null);
        setIsPasswordVerified(true);
      } else {
        setUpdateError(data.error);
        setIsPasswordVerified(false);
      }
    } catch (error) {
      console.error(error);
      setUpdateError("Unable to verify password");
      setIsPasswordVerified(false);
    }
  };

  const handleUpdateInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const id = decodedToken.id;
      const response = await fetch(`/users/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: newEmail,
          username: newUsername,
          password: newPassword,
        }),
      });

      if (response.ok) {
        setUpdateSuccess(true);
        setUpdateError(null);
        setPassword("");
        setNewEmail("");
        setNewUsername("");
        setNewPassword("");
        setIsPasswordVerified(false);
      } else {
        throw new Error("Failed to update user information");
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile Page</h1>
      <div className="profile-info">
        <div>
          <strong>Email:</strong> {user.email}
        </div>
        <div>
          <strong>Username:</strong> {user.username}
        </div>
      </div>
      <div className="password-verification">
        <label htmlFor="password" className="password-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="password-input"
        />
        <button onClick={handleVerifyPassword} className="verify-button">
          Verify Password
        </button>
        {updateError && <p className="error-message">{updateError}</p>}
      </div>
      <div className="update-info">
        <label htmlFor="email" className="update-label">
          New Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          disabled={!isPasswordVerified} // Disable if password not verified
          required
          className="update-input"
        />
      </div>
      <div className="update-info">
        <label htmlFor="username" className="update-label">
          New Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          disabled={!isPasswordVerified} // Disable if password not verified
          required
          className="update-input"
        />
      </div>
      <div className="update-info">
        <label htmlFor="newPassword" className="update-label">
          New Password:
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={!isPasswordVerified} // Disable if password not verified
          required
          className="update-input"
        />
      </div>
      <button
        onClick={handleUpdateInfo}
        disabled={!isPasswordVerified} // Disable if password not verified
        className="update-button"
      >
        Update Info
      </button>
      {updateSuccess && (
        <p className="success-message">
          Update successful! Please verify your password again to perform
          another action.
        </p>
      )}
    </div>
  );
};

export default Privacy;
