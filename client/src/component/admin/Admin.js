import React, { useState, useEffect } from "react";
import "./style/Admin.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Sidebar from "./adminControl/Siderbar";
import Books from "./adminControl/crudBooks";
import Users from "./adminControl/crudUsers";
import Authors from "./adminControl/crudAuthor";
import FAQList from "./adminControl/adminFaq";
import AdminDashboard from "./adminControl/adminDashboard";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
    fetchBooks();
    fetchAuthors();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const token = localStorage.getItem("token");
    let isAdmin = false;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        isAdmin = decodedToken.role === "admin";
      } catch (error) {
        console.error(error);
      }
    }

    setIsAdmin(isAdmin);
  };

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

  const fetchAuthors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5001/authors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateAuthor = async (author) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5001/authors", author, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        const createdAuthor = response.data.author;
        setAuthors([...authors, createdAuthor]);
      }
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
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5001/users/update/${editedUser.user_id}`,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5001/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedUsers = users.filter((user) => user.user_id !== userId);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateUser = async (user) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5001/users", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        const createdUser = response.data.user;
        setUsers([...users, createdUser]);
        setNewUser({
          username: "",
          email: "",
          role: "",
          password: "",
        });
        setShowCreateForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCreateFormClick = () => {
    setShowCreateForm(true);
  };

  return (
    <div className="admin-page">
      {isAdmin && (
        <Sidebar
          activeButton={activeButton}
          handleButtonClick={handleButtonClick}
          logout={logout}
        />
      )}
      <div className="admin-content">
        {activeButton === "Dashboard" && <AdminDashboard></AdminDashboard>}
        {activeButton === "Books" && (
          <Books books={books} fetchBooks={fetchBooks} />
        )}
        {activeButton === "Users" && (
          <Users
            users={users}
            editingUser={editingUser}
            handleEditClick={handleEditUser}
            handleSaveUser={handleSaveUser}
            handleCancelEdit={handleCancelEdit}
            handleDeleteUser={handleDeleteUser}
            showCreateForm={showCreateForm}
            newUser={newUser}
            handleChange={handleChange}
            handleCreateUser={handleCreateUser}
            setShowCreateForm={setShowCreateForm}
            handleCreateFormClick={handleCreateFormClick}
            setNewUser={setNewUser}
            setEditingUser={setEditingUser}
            fetchUsers={fetchUsers}
            handleCreateClick={handleCreateFormClick}
          />
        )}
        {activeButton === "Authors" && (
          <Authors
            authors={authors}
            fetchAuthors={fetchAuthors}
            handleCreateAuthor={handleCreateAuthor}
          />
        )}
        {activeButton === "FAQ" && <FAQList></FAQList>}
      </div>
    </div>
  );
}

export default Admin;
