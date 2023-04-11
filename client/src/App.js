import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserLogin from "./component/user/userLogin";
import UserRegister from "./component/user/userRegister";
import HomePage from "./component/user/HomePage";
import "./App.css"; // Import CSS styles

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/user/login">Log In</Link>
            </li>
            <li>
              <Link to="/user/register">Register</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/homepage" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
