import React, { useState, useEffect } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBookOpen, faUsers, faListAlt, faUser, faQuestionCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Admin() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/users");
      setUsers(response.data);
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

  return (
    <div className="admin-page">
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <button
              style={getButtonStyle("Dashboard")}
              className="sidebar-button"
              onClick={() => handleButtonClick("Dashboard")}
            >
              <FontAwesomeIcon icon={faChartLine} />
              Dashboard
            </button>
          </li>
          <li>
            <button
              style={getButtonStyle("Books")}
              className="sidebar-button"
              onClick={() => handleButtonClick("Books")}
            >
              <FontAwesomeIcon icon={faBookOpen} />
              Books
            </button>
          </li>
          <li>
            <button
              style={getButtonStyle("Users")}
              className="sidebar-button"
              onClick={() => handleButtonClick("Users")}
            >
              <FontAwesomeIcon icon={faUsers} />
              Users
            </button>
          </li>
          <li>
            <button
              style={getButtonStyle("Categories")}
              className="sidebar-button"
              onClick={() => handleButtonClick("Categories")}
            >
              <FontAwesomeIcon icon={faListAlt} />
              Categories
            </button>
          </li>
          <li>
            <button
              style={getButtonStyle("Authors")}
              className="sidebar-button"
              onClick={() => handleButtonClick("Authors")}
            >
              <FontAwesomeIcon icon={faUser} />
              Authors
            </button>
          </li>
          <li>
            <button
              style={getButtonStyle("FAQ")}
              className="sidebar-button"
              onClick={() => handleButtonClick("FAQ")}
            >
              <FontAwesomeIcon icon={faQuestionCircle} />
              FAQ
            </button>
          </li>
          <li>
            <button className="logout-button" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="admin-content">
        {activeButton === "Dashboard" && <h2>Dashboard Content Goes Here</h2>}
        {activeButton === "Books" && <h2>Books Content Goes Here</h2>}
        {activeButton === "Users" && (
          <>
            <h2>Users</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {activeButton === "Categories" && <h2>Categories Content Goes Here</h2>}
        {activeButton === "Authors" && <h2>Authors Content Goes Here</h2>}
        {activeButton === "FAQ" && <h2>FAQ Content Goes Here</h2>}
      </div>
    </div>
  );
}

export default Admin;