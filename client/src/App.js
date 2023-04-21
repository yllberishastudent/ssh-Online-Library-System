import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserLogin from "./component/user/userLogin";
import UserRegister from "./component/user/userRegister";
import HomePage from "./component/user/HomePage";
import FirstPage from "./component/user/FirstPage";
import "./App.css"; // Import CSS styles

function App() {
  return (
    <Router>
      <div class="container">
        <nav class="main-nav">
          <ul class="nav-left">
          <div class="logo">
            <Link to="/">LIB</Link>
            </div>
            <li><a href="/">POPULAR</a></li>
            <li><a href="/">GENRES</a></li>
            <li><a href="/">NEWEST</a></li>
            <li><a href="/">A-Z</a></li>
        
          </ul>
        
          <ul class="nav-right">
          
            <li class="login_button">
              <Link to="/user/login">Login</Link>
            </li>
            <li class="register_button">
              <Link to="/user/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes> --!
        <Route path="/" element={<FirstPage />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/homepage/" element={<HomePage />} />
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
