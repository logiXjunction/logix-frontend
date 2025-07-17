import React, { useState }  from 'react';
import { Menu, X ,Search } from 'lucide-react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-2 left-2 right-2 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg px-6 py-3 flex items-center justify-between rounded-none md:rounded-full">

      {/* Left Section: Logo + Nav Links */}
      <div className="flex items-center space-x-6">
        <span className="text-[#372aac] h-8 w-8 font-bold text-xl tracking-wide"><img src="/LOGO.png" alt="LxJ" /></span>
        <div className="hidden md:flex space-x-6 text-[#57534d] font-medium">
          <a href="/" className="hover:text-[#8bb5f4] transition">Home</a>
          <a href="/our-story" className="hover:text-[#8ec5ff] transition">Our Story</a>
          <a href="/join-us" className="hover:text-[#9193ad] transition">Join Us</a>
        </div>
      </div>

      {/* Center Spacer */}
      <div className="flex-1"></div>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-4">

        {/* Sign In + Get Started */}
        <a href="/sign-in"><button className="text-[#57534d] hover:text-[#d8315b] transition font-semibold">Sign In</button></a>
        <a href="/sign-up"><button className="bg-[#d8315b] hover:bg-[#b92549] text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
          Get Started
        </button></a>

        {/* Search Bar */}
        {/* <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 bg-white ml-2">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none text-sm bg-transparent w-32"
          />
        </div> */}
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6 text-[#1e1b18]" /> : <Menu className="h-6 w-6 text-[#1e1b18]" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
  <div className={`bg-white border border-white/20 rounded-xl absolute top-full left-0 w-full px-6 py-6 md:hidden shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
    {/* Centered Nav Links */}
    <div className="flex flex-col items-center justify-center space-y-2 text-[#1e1b18] font-medium">
      <a href="/" className="hover:text-[#8bb5f4] transition">Home</a>
      <a href="/our-story" className="hover:text-[#8ec5ff] transition">Our Story</a>
      <a href="/join-us" className="hover:text-[#9193ad] transition">Join Us</a>
    </div>

    <hr className="my-4" />

  {/* Auth Buttons */}
  <div className="flex flex-col items-center space-y-3">
    <a href="/sign-in"><button className="text-[#1e1b18] hover:text-[#3e92cc] font-semibold">Sign In</button></a>
    <a href="/sign-up"><button className="bg-[#d8315b] hover:bg-[#b92549] text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
      Get Started
    </button></a>
  </div>

  <hr className="my-4" />

  {/* Search Bar */}
  {/* <div className="flex items-center justify-center">
    <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 bg-white">
      <Search className="h-4 w-4 text-gray-500 mr-2" />
      <input
        type="text"
        placeholder="Search..."
        className="outline-none text-sm bg-transparent w-32"
      />
    </div>
  </div> */}
</div>

    </nav>
  );
}
