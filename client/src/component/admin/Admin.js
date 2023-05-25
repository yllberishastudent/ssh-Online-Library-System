import React, { useState, useEffect } from "react";
import "./style/Admin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./adminControl/Siderbar";
import Books from "./adminControl/crudBooks";
import Users from "./adminControl/crudUsers";

function Admin() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
    fetchBooks();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5001/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5001/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        background: "#ffe5ee",
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
        `http://localhost:5001/users/${editedUser.user_id}, editedUser`
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
      const response = await axios.post(
        "http://localhost:5001/admin/users",
        newUser
      );
      if (response.status === 201) {
        const createdUser = response.data.user;
        setUsers([...users, createdUser]);
        setNewUser({
          username: "",
          email: "",
          role: "",
          phone_number: "",
          password: "",
        });
        setShowCreateForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeNewUser = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateFormClick = () => {
    setShowCreateForm(true);
  };

  return (
    <div className="admin-page">
      <Sidebar
        activeButton={activeButton}
        handleButtonClick={handleButtonClick}
        logout={logout}
      />
      <div className="admin-content">
        {activeButton === "Dashboard" && <h2>Dashboard Content Goes Here</h2>}
        {activeButton === "Books" && <Books books={books} />}
        {activeButton === "Users" && (
          <Users
            users={users}
            editingUser={editingUser}
            handleEditUser={handleEditUser}
            handleSaveUser={handleSaveUser}
            handleCancelEdit={handleCancelEdit}
            handleDeleteUser={handleDeleteUser}
            showCreateForm={showCreateForm}
            newUser={newUser}
            handleChangeNewUser={handleChangeNewUser}
            handleCreateUser={handleCreateUser}
            setShowCreateForm={setShowCreateForm}
            handleCreateFormClick={handleCreateFormClick}
          />
        )}
        {activeButton === "Authors" && <h2>Authors Content Goes Here</h2>}
        {activeButton === "FAQ" && <h2>FAQ Content Goes Here</h2>}
      </div>
    </div>
  );
}

export default Admin;
