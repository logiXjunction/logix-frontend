import React, { useState, useEffect } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import axios from '../utils/axios';

const OtpInput = ({ mobileNumber , onVerify }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [verifying , setVerifying] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async () => {
    const enteredOtp = otp.join('');
    if(enteredOtp.length !==6){
      alert('please enter a valid 6-digit OTP');
      return;
    }

    try{
      setVerifying(true);
      setError('');

      const res= await axios.post('/api/validate/verify-otp', {
         mobileNumber: '+91' + mobileNumber,
        otp: enteredOtp,
      });

      if(res.data.success){
        onVerify();
      }else{
        setError('Invalid OTP. Please try again.');
      }
    }catch(err){
      console.error(err);
      setError('Server error while verifying OTP. Please try again later.');
    }finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    try{
      setTimer(60);
      setOtp(new Array(6).fill(''));
      setError('');

      const res =  await axios.post('/api/validate/send-otp', {
         mobileNumber: '+91' + mobileNumber
      });
      if(res.data.success){
        alert('OTP sent successfully!');
      }else{
        setError('Failed to resend OTP. Please try again.');
      }
    }catch(err){
      console.error(err);
      setError('Server error while resending OTP. Please try again later.');
    }
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

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <div className="flex justify-center items-center gap-4">
        <Button
          onClick={handleSubmit}
          disabled={verifying}
          className="bg-[#0a2463] hover:bg-[#3e92cc] text-white px-6"
        >
          {verifying ? 'Verifying...': 'Verify OTP'}
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
