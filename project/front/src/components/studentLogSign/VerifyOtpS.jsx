import React, { useState } from 'react';
import axios from 'axios';

const VerifyOtpS = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/verify-otpS', { email, otp });
      alert('OTP Verified! Token: ' + response.data.token);
      // Save token to local storage or state management for future use
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" required />
      <button type="submit">Verify OTP</button>
    </form>
  );
};

export default VerifyOtpS;
