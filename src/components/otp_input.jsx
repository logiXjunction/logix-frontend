import React, { useState, useEffect } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

const OtpInput = ({ onVerify }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto-focus to next
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      // Placeholder: replace with actual OTP verification logic
      onVerify();
    } else {
      alert('Please enter a valid 6-digit OTP');
    }
  };

  const handleResend = () => {
    setOtp(new Array(6).fill(''));
    setTimer(60);
    alert('OTP resent (placeholder logic)');
    // Add resend OTP logic here
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[#1e1b18]">Enter OTP</label>
      <div className="flex gap-2 justify-center">
        {otp.map((digit, index) => (
          <Input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-10 h-12 text-center text-lg border border-[#EEE8A9] focus:ring-[#3e92cc]"
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button
          onClick={handleSubmit}
          className="bg-[#0a2463] hover:bg-[#3e92cc] text-white px-6"
        >
          Verify OTP
        </Button>
        <div className="text-sm text-gray-600">
          {timer > 0 ? (
            <span>Resend OTP in {timer}s</span>
          ) : (
            <button onClick={handleResend} className="text-[#d8315b] hover:underline">Resend OTP</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
