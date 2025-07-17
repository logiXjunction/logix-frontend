import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const [userType, setUserType] = useState('Transporter');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      password,
      ...(contact.includes('@')
        ? { email: contact }
        : { mobileNumber: contact }),
    };

    const endpoint =
      userType === 'Transporter'
        ? 'https://bakcendrepo-1.onrender.com/api/transporters/login'
        : 'https://bakcendrepo-1.onrender.com/api/shipper/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Login successful');
        localStorage.setItem('token', data.token);
        navigate(
          userType === 'Transporter'
            ? '/transporter-dashboard'
            : '/client-dashboard'
        );
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong during login');
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaff] flex flex-col md:flex-row items-center justify-center px-6 py-12">
      {/* Left Side - Company Motto */}
      <div className="w-full md:w-1/2 flex flex-col justify-center mb-12 md:mb-0 md:pr-10">
        <img src="/LOGO_LxJ2.png" className="h-20 w-24" />
        <h1 className="text-4xl sm:text-5xl font-bold text-[#1e1b18] leading-tight mb-6">
          YOUR JUNCTION <span className="text-[#030712]">TO</span>
          <br />
          <span className="text-[#d8315b]">SMART</span>{' '}
          <span className="text-[#3e92cc]">LOGISTICS</span>
        </h1>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white shadow-xl rounded-2xl p-8 border border-[#eee] hover:shadow-2xl transition-all duration-300">
        {/* Toggle Button for User Type */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            className={`px-6 py-2 rounded-l-md border border-[#3e92cc] font-semibold focus:outline-none transition-all duration-200 ${
              userType === 'Transporter'
                ? 'bg-[#3e92cc] text-white'
                : 'bg-white text-[#3e92cc]'
            }`}
            onClick={() => setUserType('Transporter')}
          >
            Transporter
          </button>
          <button
            type="button"
            className={`px-6 py-2 rounded-r-md border border-[#3e92cc] font-semibold focus:outline-none transition-all duration-200 -ml-px ${
              userType === 'Shipper'
                ? 'bg-[#3e92cc] text-white'
                : 'bg-white text-[#3e92cc]'
            }`}
            onClick={() => setUserType('Shipper')}
          >
            Shipper
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-center text-[#0a2463] mb-6">
          Login to your account
        </h2>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="relative">
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              className="peer w-full px-4 pt-6 pb-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e92cc] transition-all duration-200 placeholder-transparent"
              placeholder="Email or mobile number"
            />
            <label className="absolute left-4 top-2 text-sm text-[#1e1b18] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#888] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#3e92cc]">
              Email or mobile number
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full px-4 pt-6 pb-2 border border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3e92cc] transition-all duration-200 placeholder-transparent"
              placeholder="Password"
            />
            <label className="absolute left-4 top-2 text-sm text-[#1e1b18] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#888] peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#3e92cc]">
              Password
            </label>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#3e92cc]" /> Remember me
            </label>
            <a href="/forgot-password" className="text-[#d8315b]">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#0a2463] text-white font-medium rounded-md hover:bg-[#3e92cc] transition-all duration-200"
          >
            Log in
          </button>

          {/* Google Login Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2 mt-4 border border-[#ccc] bg-white text-[#1e1b18] font-medium rounded-md hover:bg-[#f5f5f5] transition-all duration-200 shadow-sm"
            onClick={() => alert('Google login coming soon!')}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_17_40)">
                <path
                  d="M47.5 24.5C47.5 22.6 47.3 20.8 47 19H24V29.1H37.4C36.7 32.2 34.7 34.7 31.8 36.4V42.1H39.5C44 38.1 47.5 32.1 47.5 24.5Z"
                  fill="#4285F4"
                />
                <path
                  d="M24 48C30.6 48 36.1 45.9 39.5 42.1L31.8 36.4C29.9 37.6 27.5 38.3 24 38.3C17.7 38.3 12.2 34.2 10.3 28.7H2.3V34.6C5.7 41.1 14.1 48 24 48Z"
                  fill="#34A853"
                />
                <path
                  d="M10.3 28.7C9.8 27.5 9.5 26.2 9.5 24.8C9.5 23.4 9.8 22.1 10.3 20.9V15H2.3C0.8 18.1 0 21.4 0 24.8C0 28.2 0.8 31.5 2.3 34.6L10.3 28.7Z"
                  fill="#FBBC05"
                />
                <path
                  d="M24 9.7C27.8 9.7 30.7 11.1 32.6 12.9L39.7 6C36.1 2.7 30.6 0 24 0C14.1 0 5.7 6.9 2.3 15L10.3 20.9C12.2 15.4 17.7 9.7 24 9.7Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Login with Google
          </button>

          <div className="space-y-18">
            <p className="text-center text-sm text-[#0a2463]">
              Don't have an account <br />
              <span>
                <button
                  type="button"
                  className="hover:text-[#d8315b] focus:outline-none"
                  onClick={() => navigate(`/sign-up?userType=${userType}`)}
                >
                  Create account →
                </button>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
