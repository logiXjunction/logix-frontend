import React, { useState } from 'react';
import { Switch } from '../components/ui/Switch';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import OtpInput from '../components/otp_input';
import { useNavigate } from 'react-router-dom';


export default function SignupFormPage() {
  const [role, setRole] = useState('shipper');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gst, setGst] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your backend submission logic
    
    if(!otpVerified) {
      alert('Please verify your OTP before submitting');
      return;
    }

    if(role=== 'shipper') {
      navigate('/shipper-registration');
    }else {
      navigate('/carrier-registration');
    }
  };

  const handleSendOtp = () => {
    if (phone.match(/^\d{10}$/)) {
      setShowOtp(true);
    } else {
      alert('Enter valid 10-digit phone number');
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaff] flex flex-col md:flex-row items-center justify-center px-6 py-12">
      
      {/* Left Side - Company Motto */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center mb-12 md:mb-0 md:pr-10">
        <img src="/LOGO_LxJ2.png" className="h-20 w-24" />
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1e1b18] leading-tight mb-6">
          YOUR JUNCTION <span className="text-[#030712]">TO</span>
          <br />
          <span className="text-[#d8315b]">SMART</span>{' '}
          <span className="text-[#3e92cc]">LOGISTICS</span>
        </h1>
      </div>

        {/* right section - form  */}
        <div className="min-h-screen flex-1 mt-22 ml-8 justify-center  bg-[#fffaff] p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6 ">
              <h2 className="text-2xl font-bold text-center text-[#0a2463]">Register as {role}</h2>
              <div className="flex items-center justify-center gap-4">
                <span className={`font-medium ${role === 'shipper' ? 'text-[#d8315b]' : ''}`}>Shipper</span>
                <Switch
                  checked={role === 'transporter'}
                  onCheckedChange={() => setRole(role === 'shipper' ? 'transporter' : 'shipper')}
                />
                <span className={`font-medium ${role === 'transporter' ? 'text-[#3e92cc]' : ''}`}>Transporter</span>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#1e1b18]">Phone Number</label>
                  <div className="flex gap-2">
                    <Input
                      type="tel"
                      placeholder="Enter 10-digit phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" onClick={handleSendOtp} className="cursor-pointer  bg-[#3e92cc] hover:bg-[#0a2463] text-white">
                      Send OTP
                    </Button>
                  </div>
                </div>

                {showOtp && !otpVerified && (
                  <OtpInput onVerify={() => setOtpVerified(true)} />
                )}

                <div>
                  <label className="block mb-1 text-sm font-medium text-[#1e1b18]">Email</label>
                  <Input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    required
                    className="w-full"
                  />
                </div>
            
                <div>
                  <label className="block mb-1 text-sm font-medium text-[#1e1b18]">GST Number</label>
                  <Input
                    type="text"
                    placeholder="Enter GST number"
                    value={gst}
                    onChange={(e) => setGst(e.target.value.toUpperCase())}
                    pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
                    required
                    className="w-full"
                  />
                  <small className="text-xs text-gray-500">
                    Format: 11AAAAA1111A1Z1
                  </small>
                </div>
            
                <Button
                  type="submit"
                  disabled={!otpVerified}
                  className="cursor-pointer w-full bg-[#d8315b] hover:bg-[#a81e3e] text-white font-semibold"
                >
                  Submit
                </Button>
              </form>
            </div>
        </div>
    </div>);
}
