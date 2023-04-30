import React, { useState } from 'react';
import './membership.css'

function Membership() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardDate, setCardDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement submission logic
  }


  const handleCardNumberChange = (event) => {
    // Only allow 16 digit numbers
    const value = event.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(value);
  }

  const handleCvvChange = (event) => {
    // Only allow 3 digit numbers
    const value = event.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
  }

  const handleCardDateChange = (event) => {
    // Only allow date in YYYY-MM format
    const value = event.target.value.replace(/[^\d-]/g, '').slice(0, 7);
    setCardDate(value);
  }

  return (
    <div className="membership-container">
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
          <input type="text" id="card-date" placeholder="Enter expiration date" value={cardDate} onChange={(e) => setCardDate(e.target.value)} required />
        </div>
        <button type="submit">Purchase</button>
      </form>
    </div>
  );
}

export default Membership;