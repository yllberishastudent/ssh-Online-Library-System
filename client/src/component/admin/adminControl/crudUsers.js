import React, { useState } from "react";
import axios from "axios";

function Users({
  users,
  editingUser,
  showCreateForm,
  newUser,
  handleCancelEdit,
  handleSaveUser,
  handleDeleteUser,
  handleCreateUser,
  handleChange,
  setShowCreateForm,
  setNewUser,
  setEditingUser,
  fetchUsers,
}) {
  const [validationError, setValidationError] = useState(null);
  const [duplicateNameError, setDuplicateNameError] = useState(false);
  const [duplicateEmailError, setDuplicateEmailError] = useState(false);

  const handleEditClick = (user) => {
    setEditingUser({ ...user });
  };

  const handleCancelClick = () => {
    handleCancelEdit();
  };

  const checkDuplicate = (fieldName, fieldValue) => {
    const isDuplicate = users.some(
      (user) =>
        user[fieldName] === fieldValue && user.user_id !== editingUser.user_id
    );
    return isDuplicate;
  };

  const handleSaveClick = (editedUser) => {
    const { username, email } = editedUser;
    const isDuplicateName = checkDuplicate("username", username);
    const isDuplicateEmail = checkDuplicate("email", email);

    setDuplicateNameError(isDuplicateName);
    setDuplicateEmailError(isDuplicateEmail);

    if (!isDuplicateName && !isDuplicateEmail) {
      handleSaveUser(editedUser);
    }
  };

  const handleDeleteClick = (userId) => {
    handleDeleteUser(userId);
  };

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  const validateEmail = (email) => {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    // Password validation regex pattern
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleCreateUserClick = async () => {
    if (
      !newUser.username ||
      !newUser.email ||
      !newUser.role ||
      !newUser.password
    ) {
      setValidationError("Please fill in all the required fields.");
      return;
    }

    if (!validateEmail(newUser.email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(newUser.password)) {
      setValidationError(
        "Please enter a password with at least 8 characters, including uppercase letters, lowercase letters, and numbers."
      );
      return;
    }

    try {
      const role_id = newUser.role === "admin" ? 1 : 2;
      const response = await axios.post(
        "/admin/users",
        { ...newUser, role_id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { user } = response.data;
      handleCreateUser(user);
      setShowCreateForm(false);
      fetchUsers();
      setNewUser({
        // Clear newUser state
        username: "",
        email: "",
        role: "",
        password: "",
      });
    } catch (error) {
      if (error.response) {
        setValidationError(error.response.data.message);
      } else {
        setValidationError("Internal server error");
      }
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (showCreateForm) {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    } else {
      setEditingUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
    setValidationError(null); // Clear validation error when the input changes
  };

  return (
    <div className="users-container">
      <div className="users-container__section">
        <h1 className="admin-content__title">Users</h1>
        {!showCreateForm && (
          <div
            className="action-button action-button__text"
            onClick={handleCreateClick}
          >
            Create User
          </div>
        )}
      </div>
      {showCreateForm ? (
        // Create user form
        <div className="create-user-form">
          {/* Form fields */}
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={newUser.email}
              onChange={handleChangeInput}
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleChangeInput}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleChangeInput}
            />
          </div>
          {/* Action buttons */}
          <div className="action-button__section">
            <button className="action-button" onClick={handleCreateUserClick}>
              Create
            </button>
            <button className="action-button" onClick={handleCancelCreate}>
              Cancel
            </button>
          </div>
          {validationError && (
            <p className="error-message">{validationError}</p>
          )}
        </div>
      ) : (
        // User list
        <table className="user-list">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <div>
                      <input
                        type="text"
                        name="username"
                        value={editingUser.username}
                        onChange={handleChangeInput}
                        className={duplicateNameError ? "error" : ""}
                      />
                      {duplicateNameError && (
                        <p className="error-message">Username taken. Please choose another.</p>
                      )}
                    </div>
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <div>
                      <input
                        type="text"
                        name="email"
                        value={editingUser.email}
                        onChange={handleChangeInput}
                        className={duplicateEmailError ? "error" : ""}
                      />
                      {duplicateEmailError && (
                        <p className="error-message">Email taken. Please choose another.</p>
                      )}
                    </div>
                  ) : (
                    user.email
                  )}
                </td>
                <td>{user.role}</td>
                <td>
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <div className="action-buttons">
                      <button
                        className="action-button action-button--1"
                        onClick={() => handleSaveClick(editingUser)}
                      >
                        Save
                      </button>
                      <button
                        className="action-button action-button--2"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="action-buttons">
                      <button
                        className="action-button action-button--1"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-button action-button--2"
                        onClick={() => handleDeleteClick(user.user_id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;