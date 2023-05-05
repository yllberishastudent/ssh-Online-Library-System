import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import './membership.css'

const token = localStorage.getItem("token");

function Membership() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [membershipStatus, setMembershipStatus] = useState('');
  
  let token = localStorage.getItem("token");
  let userId = null;
  const decodedToken = jwtDecode(token);
  userId = decodedToken.id;

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setMembershipStatus(userData.user.membership_status); 
        console.log(membershipStatus);
      }
    }
    fetchUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (membershipStatus === 'active') {
      alert("Your membership is already active"); // show message if membership is already active
    } else {
      // Validate card number
      if (!/^\d{16}$/.test(cardNumber)) {
        alert("Invalid credit card number");
        return;
      }

      // Validate CVV
      if (!/^\d{3}$/.test(cvv)) {
        alert("Invalid CVV");
        return;
      }

      const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
     if (!regex.test(cardDate)) {
      alert("Please enter a valid date in the MM/YY format");
      return;
      }

      // Validate expiration date
      const currentDate = new Date();
      const [month, year] = cardDate.split('/');
      const expirationDate = new Date(parseInt(`20${year}`, 10), parseInt(month, 10) - 1);
      if (expirationDate <= currentDate) {
        alert("Credit card has expired");
        return;
      }

      
  const response = await fetch('/users/membership', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Replace token with the user's JWT token
    },
    body: JSON.stringify({
      membership_status: 'active' // Set the membership status to active
    })
  });
  if (response.ok) {
    alert("Membership updated successfully")
    window.location.reload();
  } else {
    alert("Something went wrong")
  }
  }
  }
  return (
    <div className="membership-container">
      <div class="membership__wrapper">
      {membershipStatus === 'active' && <div className="membership__active"><p>Your membership is already active</p></div>} 
      {membershipStatus !== 'active' &&
      <form onSubmit={handleSubmit}>
        <div className="membership__element">
          <label htmlFor="name">Name:</label>
          <input type="text" placeholder="Enter name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="membership__element">
          <label htmlFor="lastName">Lastname:</label>
          <input type="text" placeholder="Enter lastname" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="membership__element">
          <label htmlFor="card-type">Card Type:</label>
          <select id="card-type" value={cardType} onChange={(e) => setCardType(e.target.value)} required>
            <option value="">Select Card Type</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="amex">American Express</option>
          </select>
        </div>
        <div className="membership__element">
          <label htmlFor="card-number">Card Number:</label>
          <input type="text" placeholder="Enter card number" id="card-number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength={16} required />
        </div>
        <div className="membership__element">
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" placeholder="Enter cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} maxLength={3} required />
        </div>
        <div className="membership__element">
          <label htmlFor="card-date">Card Date:</label>
          <input type="text" id="card-date" placeholder="Enter expiration date MM/YY" value={cardDate} onChange={(e) => setCardDate(e.target.value)} required />
        </div>
        <button type="submit">Purchase</button>
      </form>
}
</div>
    </div>
  );
}

export default Membership;