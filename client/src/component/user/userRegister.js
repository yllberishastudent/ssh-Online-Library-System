import React, { useState } from 'react';
import './UserRegister.css'; // Import CSS styles

function UserRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Submitting username ${username} and password ${password}`);
    // You can replace the console.log with your own logic to submit the form data
  }

  return (
    <div class="login-wrap">
    <form onSubmit={handleSubmit} className="login-form">
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <label>
        Email:
        <input type="email" value={password} onChange={handlePasswordChange} />
      </label>
      <label>
        Phone Number:
        <input type="number" value={password} onChange={handlePasswordChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      
      <button type="submit">Register</button>
    </form>
    </div>
  );
}

export default UserRegister;