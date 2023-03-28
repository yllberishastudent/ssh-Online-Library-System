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
    <form onSubmit={handleSubmit} class="login-form" action="/login" method="POST">
      <label>
        <div class="label-text">
        Username:
        </div>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
      </label>
      <label>
      <div class="label-text">
        Password:
        </div>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button type="submit">Log in</button>
    </form>
    </div>
  );
}

export default UserLogin;