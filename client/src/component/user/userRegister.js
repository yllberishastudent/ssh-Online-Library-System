import React, { useState } from 'react';
import './UserRegister.css'; // Import CSS styles

function UserRegister() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleNumberChange(event) {
    setNumber(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Submitting username ${username} and email ${email} and phone number ${phone_number} password ${password}`);
  }


  return (
    <div class="register-wrap">
    <form onSubmit={handleSubmit} className="register-form">
      <label>
      <div class="label-text">
        Username:
        </div>
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <label>
      <div class="label-text">
        Email:
        </div>
        <input type="text" value={email} onChange={handleEmailChange} />
      </label>
      <label>
      <div class="label-text">
        Phone Number:
        </div>
        <input type="text" value={phone_number} onChange={handleNumberChange} />
      </label>
      <label>
      <div class="label-text">
        Password:
        </div>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <label>
      <div class="label-text">
        Confirm Password:
        </div>
        <input type="password" value={confirm_password} onChange={handleConfirmPasswordChange} />
      </label>
      
      <button type="submit">Register</button>
    </form>
    </div>
  );
}

export default UserRegister;