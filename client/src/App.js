import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserLogin from "./component/user/userLogin";
import UserRegister from "./component/user/userRegister";
import HomePage from "./component/user/HomePage";
import FirstPage from "./component/user/FirstPage";
import Admin from "./component/user/Admin";
import Books from "./component/user/Books";
import Membership from "./component/user/Membership";
import Email from "./component/user/email";
import Contact from './component/user/Contact';
import Privacy from "./component/user/Privacy";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./App.css"; // Import CSS styles

function App() {
  let token = localStorage.getItem("token");
  let userName = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userName = decodedToken.username;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Router>
      <div class="container">
        <nav class="main-nav">
          <ul class="nav-left">
            <div class="logo">
              <Link to="/">LIB</Link>
            </div>
            {userName ? (
              <></>
            ) : (
              <>
                <li>
                  <a href="#popular">POPULAR</a>
                </li>
                <li>
                  <a href="#newest">NEWEST</a>
                </li>
                <li>
                  <a href="#a-z">A-Z</a>
                </li>
                <li>
                  <Link to="/user/contact">Contact Us</Link>
                </li>
              </>
            )}
          </ul>

          <AuthNav userName={userName} />
        </nav>
        <Routes>
          {" "}
          --!
          <Route path="/" element={<FirstPage />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/homepage/" element={<HomePage />} />
          <Route path="/user/admin" element={<Admin />} />
          <Route path="/user/books/:id" element={<Books />} />
          <Route path="/user/membership/:userName" element={<Membership />} />
          <Route path="/user/contact" element={<Contact />} />
          <Route path="/user/privacy" element={<Privacy />} />
          <Route path="/user/email" element={<Email />} />
        </Routes>
      </div>
    </Router>
  );
}
function AuthNav({ userName }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
    window.location.reload();
  };
  const goToMembership = () => {
    navigate(`/user/membership/${userName}`);
  };
  const gotoHomepage = () => {
    navigate("user/homepage");
  };
  const handleSelectionChange = (event) => {
    const selectedOption = event.target.value;

    if (selectedOption === "home") {
      gotoHomepage();
    } else if (selectedOption === "membership") {
      goToMembership();
    } else if (selectedOption === "logout") {
      logout();
    }
  };
  return (
    <ul className="nav-right">
      {userName ? (
        <>
          <select className="custom-select" onChange={handleSelectionChange}>
            <option value="home">{userName}</option>
            <option value="membership">Membership</option>
            <optgroup label="Settings">
              <option value="info">Privacy</option>
            </optgroup>
            <option value="logout">Logout</option>
          </select>
        </>
      ) : (
        <>
          <li className="login_button">
            <Link to="/user/login">Login</Link>
          </li>
          <li className="register_button">
            <Link to="/user/register">
              {" "}
              <span class="btn_white">Register</span>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default App;
