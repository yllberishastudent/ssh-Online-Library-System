import React, { useState, useEffect } from "react";
import "./style/Admin.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBookOpen, faUsers, faUser, faQuestionCircle, faSignOutAlt, faEdit,faTrashAlt, faSave,faTimes} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Admin() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5001/books");
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
    window.location.reload();
  };

  const getButtonStyle = (buttonName) => {
    if (activeButton === buttonName) {
      return {
        color: "#ff0055",
        background: "#ffe5ee"
      };
    }
    return {};
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleSaveUser = async (editedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/users/${editedUser.user_id}`,
        editedUser
      );
      if (response.status === 200) {
        const updatedUsers = users.map((user) =>
          user.user_id === editedUser.user_id ? editedUser : user
        );
        setUsers(updatedUsers);
        setEditingUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/users/${userId}`
      );
      if (response.status === 200) {
        const updatedUsers = users.filter((user) => user.user_id !== userId);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post("http://localhost:5001/users", newUser);
      if (response.status === 201) {
        const createdUser = response.data;
        setUsers([...users, createdUser]);
        setNewUser({
          username: "",
          email: "",
          role: ""
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeNewUser = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-page">
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <button style={getButtonStyle("Dashboard")} className="sidebar-button" onClick={() => handleButtonClick("Dashboard")}>
            <FontAwesomeIcon icon={faChartLine} /> Dashboard
            </button>
            </li><li>
            <button style={getButtonStyle("Books")} className="sidebar-button" onClick={() => handleButtonClick("Books")}>
            <FontAwesomeIcon icon={faBookOpen} /> Books
            </button>
            </li><li>
            <button style={getButtonStyle("Users")} className="sidebar-button" onClick={() => handleButtonClick("Users")}>
            <FontAwesomeIcon icon={faUsers} /> Users
            </button>
            </li><li>
            </li><li>
            <button style={getButtonStyle("Authors")} className="sidebar-button" onClick={() => handleButtonClick("Authors")}>
            <FontAwesomeIcon icon={faUser} /> Authors
            </button>
            </li><li>
            <button style={getButtonStyle("FAQ")} className="sidebar-button" onClick={() => handleButtonClick("FAQ")}>
            <FontAwesomeIcon icon={faQuestionCircle} /> FAQ
            </button>
            </li><li>
            <button className="logout-button" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
            </li></ul>
            </div>
                  <div className="admin-content">
                    {activeButton === "Dashboard" && <h3>Dashboard Content Goes Here</h3>}
                    {activeButton === "Books" && ( <>
                        <h3 className="admin-content__title">Books</h3>
                        <table>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Title</th>
                              <th>Author</th>
                              <th>Description</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {books.map((book) => (
                              <tr key={book.book_id}>
                                <td>{book.book_id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.description}</td>
                                <td>{book.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        </>
                    )}
                    {activeButton === "Users" && ( <>
                        <div className="admin-content__header">
                        <h3 className="admin-content__title">Users</h3>
                        <a className="admin-content__link">Create User</a>
                        </div>
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
                        {!editingUser && (
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
                <button className="action-button" onClick={handleCreateUser}>
                  Create
                </button>
              </div>
            )}
          </>
        )}
        {activeButton === "Authors" && <h3>Authors Content Goes Here</h3>}
        {activeButton === "FAQ" && <h3>FAQ Content Goes Here</h3>}
      </div>
    </div>
  );
}

export default Admin;