import React, { useState } from 'react';
import './Email.css'; // Import the CSS file for Email component

function Email() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [otpSent, setOTPSent] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/password-recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('OTP sent successfully');
        setOTPSent(true);
      } else {
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/otp-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        console.log('OTP verification successful');
        // GO TO A PAGE?
      } else {
        console.error('OTP verification failed');
        // TRY AGAIN?
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <div className="Email">
      <h1>Email OTP</h1>
      {!otpSent ? (
        <form className="email-form" onSubmit={handleEmailSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br /><br />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form className="otp-form" onSubmit={handleOTPSubmit}>
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
          />
          <br /><br />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
}

export default Email;
