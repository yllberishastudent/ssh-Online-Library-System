import React from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

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
              <i className="fas fa-chart-line"></i>
              <h2> Dashboard </h2>
            </button>
          </li>
          <li>
            <button>
              <i className="fas fa-book-open"></i>
              <h2> Books </h2>
            </button>
          </li>
          <li>
            <button>
              <i className="fas fa-users"></i>
             <h2> Users </h2>
            </button>
          </li>
          <li>
            <button>
              <i className="fas fa-list-alt"></i>
              <h2> Categories </h2>
            </button>
          </li>
          <li>
            <button>
              <i className="fas fa-user"></i>
              <h2> Authors </h2>
            </button>
          </li>
          <li>
            <button>
              <i className="fas fa-question-circle"></i>
              <h2> FAQ </h2>
            </button>
          </li>
          <li>
            <button className="logout-button" onClick={logout}>
              <i className="fas fa-sign-out-alt"></i>
              <h2> LogOut </h2>
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
