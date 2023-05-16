import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBookOpen,
  faUsers,
  faUser,
  faQuestionCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ activeButton, handleButtonClick, logout }) {
  const getButtonStyle = (buttonName) => {
    if (activeButton === buttonName) {
      return {
        color: "#ff0055",
        background: "#ffe5ee",
      };
    }
    return {};
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li>
          <button
            style={getButtonStyle("Dashboard")}
            className="sidebar-button"
            onClick={() => handleButtonClick("Dashboard")}
          >
            <FontAwesomeIcon icon={faChartLine} /> Dashboard
          </button>
        </li>
        <li>
          <button
            style={getButtonStyle("Books")}
            className="sidebar-button"
            onClick={() => handleButtonClick("Books")}
          >
            <FontAwesomeIcon icon={faBookOpen} /> Books
          </button>
        </li>
        <li>
          <button
            style={getButtonStyle("Users")}
            className="sidebar-button"
            onClick={() => handleButtonClick("Users")}
          >
            <FontAwesomeIcon icon={faUsers} /> Users
          </button>
        </li>
        <li>
          <button
            style={getButtonStyle("Authors")}
            className="sidebar-button"
            onClick={() => handleButtonClick("Authors")}
          >
            <FontAwesomeIcon icon={faUser} /> Authors
          </button>
        </li>
        <li>
          <button
            style={getButtonStyle("FAQ")}
            className="sidebar-button"
            onClick={() => handleButtonClick("FAQ")}
          >
            <FontAwesomeIcon icon={faQuestionCircle} /> FAQ
          </button>
        </li>
        <li>
          <button className="logout-button" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
