import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Update import

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 
  const scrollAndNavigate = (to) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(() => {
      navigate(to);
    }, 0);
  };

  return (
    <nav className="fixed top-2 left-2 right-2 z-50 bg-white/40 backdrop-blur-md border border-white/30 shadow-lg px-6 py-3 flex items-center justify-between rounded-none md:rounded-full">

      {/* Left Section: Logo + Nav Links */}
      <div className="flex items-center space-x-6">
        <span className="h-8 w-8 font-bold text-xl tracking-wide text-neutral-900">
          <img src="/LOGO.png" alt="LxJ" />
        </span>
        <div className="hidden md:flex space-x-6  text-neutral-800 font-semibold">
          <Link onClick={()=>scrollAndNavigate("/")} className="hover:text-[#8bb5f4] transition">Home</Link>
          
          <Link
            className="hover:text-[#8ec5ff] transition bg-transparent"
            onClick={()=>scrollAndNavigate("/about-us")}
          >
            Our Story
          </Link>
          <Link onClick={()=>scrollAndNavigate("/join-us")} className="hover:text-[#9193ad] transition">Join Us</Link>
        </div>
      </div>

      {/* Center Spacer */}
      <div className="flex-1"></div>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Sign In + Get Started */}
        <Link onClick={()=>scrollAndNavigate("/sign-in")}>
          <button className="text-neutral-800 hover:text-[#d8315b] transition font-semibold">Sign In</button>
        </Link>
        <Link onClick={()=>scrollAndNavigate("/signup-otp")}>
          <button className="bg-[#d8315b] hover:bg-[#b92549] text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
            Get Started
          </button>
        </Link>

        {/* Search Bar */}
        {/* 
        <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 bg-white ml-2">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none text-sm bg-transparent w-32"
          />
        </div> 
        */}
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen
            ? <X className="h-6 w-6 text-neutral-800" />
            : <Menu className="h-6 w-6 text-neutral-800" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div className={`mt-2 bg-white/70 backdrop-blur-md border border-white/20 rounded-xl absolute top-full left-0 w-full px-6 py-6 md:hidden shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
        {/* Centered Nav Links */}
        <div className="flex flex-col items-center justify-center space-y-2 text-neutral-900 font-medium">
          <a href="/" className="hover:text-[#8bb5f4] transition">Home</a>
          <button
            className="hover:text-[#8ec5ff] transition bg-transparent"
            onClick={() => { setIsOpen(false); navigate('/about-us'); }}
          >
            Our Story
          </button>
          <a href="/join-us" className="hover:text-[#9193ad] transition">Join Us</a>
        </div>

        <hr className="my-4 border-white/30" />

        {/* Auth Buttons */}
        <div className="flex flex-col items-center space-y-3">
          <Link to="/sign-in">
            <button className="text-neutral-900 hover:text-[#3e92cc] font-semibold">Sign In</button>
          </Link>
          <Link to="about-us">
            <button className="bg-[#d8315b] hover:bg-[#b92549] text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
              Get Started
            </button>
          </Link>
        </div>

        <hr className="my-4 border-white/30" />

        {/* Search Bar */}
        {/* 
        <div className="flex items-center justify-center">
          <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 bg-white">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none text-sm bg-transparent w-32"
            />
          </div>
        </div> 
        */}
      </div>

    </nav>
  );
}
