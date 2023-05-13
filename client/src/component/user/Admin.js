import React from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChartLine, faBookOpen, faUsers, faListAlt, faUser, faQuestionCircle, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

function Admin() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
    window.location.reload();
  };
  return (
    <div className="admin-page">
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <button>
              <FontAwesomeIcon icon={faChartLine} />
              Dashboard
            </button>
          </li>
          <li>
            <button>
              <FontAwesomeIcon icon={faBookOpen} />
              Books
            </button>
          </li>
          <li>
            <button>
              <FontAwesomeIcon icon={faUsers} />
              Users
            </button>
          </li>
          <li>
            <button>
              <FontAwesomeIcon icon={faListAlt} />
              Categories
            </button>
          </li>
          <li>
            <button>
              <FontAwesomeIcon icon={faUser} />
              Authors
            </button>
          </li>
          <li>
            <button>
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
      <footer className="footer">
        <p className="footer-text">© Admin dashboard</p>
      </footer>
      </div>
    </div>
  );
}

export default Admin;