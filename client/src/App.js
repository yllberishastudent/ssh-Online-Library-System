import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserLogin from "./component/user/userLogin";
import UserRegister from "./component/user/userRegister";
import HomePage from "./component/user/HomePage";
import FirstPage from "./component/user/FirstPage";
import Books from "./component/user/Books";
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

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
              <>
              </>
            ):
            <>
              <li><a href="/">POPULAR</a></li>
              <li><a href="/">GENRES</a></li>
              <li><a href="/">NEWEST</a></li>
              <li><a href="/">A-Z</a></li>
            </>
            }
            
        
          </ul>
        
         
         
          <AuthNav userName={userName} />
        </nav>
        <Routes> --!
        <Route path="/" element={<FirstPage />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/homepage/" element={<HomePage />} />
          <Route path="/user/books/:id" element={<Books />} />

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

  return (
    <ul className="nav-right">
      {userName ? (
        <>
          <li className="emri">{userName}</li>
          
            <li className="logout_button" onClick={logout}>
              Logout
            </li>
          
        </>
      ) : (
        <>
          <li className="login_button">
            <Link to="/user/login">Login</Link>
          </li>
          <li className="register_button">
            <Link to="/user/register">Register</Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default App;
