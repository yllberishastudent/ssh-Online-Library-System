import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserLogin from "./component/user/UserLogin";
import UserRegister from "./component/user/UserRegister";
import './App.css'; // Import CSS styles

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
          <Route path="/"/>
          <Route path="/user/login" element={<UserLogin/>}/>
          <Route path="/user/register" element={<UserRegister/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;