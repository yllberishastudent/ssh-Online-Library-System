import React, { useState } from 'react';
import './UserLogin.css'; // Import CSS styles

function UserLogin() {
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
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button type="submit">Log in</button>
    </form>
    </div>
  );
}

export default UserLogin;