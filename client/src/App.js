import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserLogin from "./component/user/userLogin";
import UserRegister from "./component/user/userRegister";
import HomePage from "./component/user/HomePage";
import FirstPage from "./component/user/FirstPage";
import Admin from "./component/admin/Admin";
import Books from "./component/user/Books";
import Membership from "./component/user/Membership";
import Email from "./component/user/email";
import Contact from "./component/user/Contact";
import Privacy from "./component/user/Privacy";
import jwtDecode from "jwt-decode";
import Author from "./component/user/Author";
import FAQ from "./component/user/FAQ";
import UserHistoryPage from "./component/user/UserHistoryPage";
import Favorites from "./component/user/Favorites";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "./App.css"; // Import CSS styles

function App() {
  let token = localStorage.getItem("token");
  let userName = null;
  let userRole = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userName = decodedToken.username;
      userRole = decodedToken.role;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Router>
      <div>
        <nav className="main-nav">
          <ul className="nav-left">
            <div className="logo">
              <Link to="/">LIB</Link>
            </div>
            <li>
              {" "}
              {userRole === "member" && (
                <>
                  <Link to="/user/contact">Contact Us</Link>
                </>
              )}
            </li>
          </ul>

          <AuthNav userName={userName} userRole={userRole} />
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/admin" element={<Admin />} />
            {userRole === "member" && (
              <>
                <Route path="/user/homepage/" element={<HomePage />} />
                <Route path="/user/books/:id" element={<Books />} />
                <Route
                  path="/user/membership/:userName"
                  element={<Membership />}
                />
                <Route path="/user/contact" element={<Contact />} />
                <Route path="/user/profile" element={<Privacy />} />
                <Route path="/user/:id/info" element={<Author />} />
                <Route path="/user/email" element={<Email />} />
                <Route path="/user/faq" element={<FAQ />} />
                <Route path="/user/history" element={<UserHistoryPage />} />
                <Route path="/user/favorites" element={<Favorites />} />
              </>
            )}
          </Routes>
        </div>
        {/* Footer component */}
        <Footer />
      </div>
    </Router>
  );
}
function AuthNav({ userName, userRole }) {
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
  const goToProfile = () => {
    navigate("user/profile");
  };
  const goToFAQ = () => {
    navigate("user/faq");
  };
  const gotoHistory = () => {
    navigate("user/history");
  };
  const gotoFavorites = () => {
    navigate("user/favorites");
  };
  const handleSelectionChange = (event) => {
    const selectedOption = event.target.value;

    if (selectedOption === "home") {
      gotoHomepage();
    } else if (selectedOption === "membership") {
      goToMembership();
    } else if (selectedOption === "help") {
      goToFAQ();
    } else if (selectedOption === "logout") {
      logout();
    } else if (selectedOption === "info") {
      goToProfile();
    } else if (selectedOption === "history") {
      gotoHistory();
    } else if (selectedOption === "favorites") {
      gotoFavorites();
    }
  };

  return (
    <ul className="nav-right">
      {userName ? (
        <>
          <select className="custom-select" onChange={handleSelectionChange}>
            <option value="home">{userName}</option>
            {userRole === "member" && (
              <>
                <option value="membership">Membership</option>
                <option value="help">Help</option>
                <option value="history">User History</option>
                <option value="favorites">Favorites</option>
                <optgroup label="Settings">
                  <option value="info">Profile</option>
                </optgroup>
              </>
            )}
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
              <span className="btn_white">Register</span>
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

function Footer() {
  // const history = useHistory();
  // const handleLinkClick = () => {
  //   history.push('./component/user/Contact');
  // };
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          Online<span>Library</span>
        </h3>
        <p className="footer-links">
          <Link to="/user/homepage">Home</Link>|
          <Link to="./user/Contact">Go to Contact</Link>
        </p>
        <p className="footer-company-name">
          Copyright © 2023 <strong>OnlineLibrary</strong> All rights reserved
        </p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>Location</span> Location
          </p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p>+12 1234567890</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p className="footer-email">ssh.librarysys@gmail.com</p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          <b>OnlineLibrary</b> is an initiative of the Internet Archive,
          building a digital library of Internet sites and other cultural
          artifacts in digital form.
        </p>
        <div className="footer-icons">
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default App;
