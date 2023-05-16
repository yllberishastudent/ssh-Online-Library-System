import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function Users({
  users,
  editingUser,
  handleEditUser,
  handleSaveUser,
  handleCancelEdit,
  handleDeleteUser,
  showCreateForm,
  newUser,
  handleChangeNewUser,
  handleCreateUser,
  setShowCreateForm,
  handleCreateFormClick,
}) {
  return (
    <>
      <div className="admin-content__header">
        <h2 className="admin-content__title">Users</h2>
        <h3 className="admin-content__link" onClick={handleCreateFormClick}>
          Create User
        </h3>
      </div>
      {showCreateForm ? (
        <div className="create-user-form">
          <h3>Create User</h3>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={newUser.username}
            onChange={handleChangeNewUser}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={newUser.email}
            onChange={handleChangeNewUser}
          />
          <input
            type="text"
            placeholder="Role"
            name="role"
            value={newUser.role}
            onChange={handleChangeNewUser}
          />
          <button
            className="action-button"
            onClick={() => {
              handleCreateUser();
              setShowCreateForm(false);
            }}
          >
            Create
          </button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td>{user.role}</td>
                <td>
                  {editingUser && editingUser.user_id === user.user_id ? (
                    <>
                      <button
                        className="action-button"
                        onClick={() => handleSaveUser(editingUser)}
                      >
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button
                        className="action-button"
                        onClick={handleCancelEdit}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="action-button"
                        onClick={() => handleEditUser(user)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="action-button"
                        onClick={() => handleDeleteUser(user.user_id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Users;
