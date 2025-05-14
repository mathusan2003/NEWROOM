import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const sendOtp = async () => {
    try {
      await axios.post('http://localhost:3001/send-otp', { email });
      setStep(2);
      alert("OTP sent to your email!");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post('http://localhost:3001/verify-otp', { email, otp });
      setStep(3);
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  const resetPassword = async () => {
    try {
      await axios.post('http://localhost:3001/reset-password', { email, newPassword });
      alert("Password reset successful!");
      window.location.href = "/login";
    } catch (err) {
      alert("Error resetting password");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Forgot Password</h3>

      {step === 1 && (
        <>
          <input type="email" className="form-control mb-3"
            placeholder="Enter your email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn btn-primary" onClick={sendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input type="text" className="form-control mb-3"
            placeholder="Enter the OTP"
            value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button className="btn btn-success" onClick={verifyOtp}>Verify OTP</button>
        </>
      )}

      {step === 3 && (
        <>
          <input type="password" className="form-control mb-3"
            placeholder="Enter new password"
            value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button className="btn btn-success" onClick={resetPassword}>Reset Password</button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
