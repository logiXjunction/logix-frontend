import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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
    <>
      <nav className="fixed top-2 left-2 right-2 z-50 bg-white border border-white/30 shadow-lg px-6 py-3 flex items-center justify-between rounded-full md:rounded-full">
        
        {/* Left Section: Logo + Nav Links */}
        <div className="flex items-center space-x-6">
          <span className="h-8 w-8 font-bold text-xl tracking-wide text-neutral-900">
            <img src="/LOGO.png" alt="LxJ" />
          </span>
          <div className="hidden md:flex space-x-6 text-neutral-800 font-semibold">
            <Link onClick={() => scrollAndNavigate("/")} className="hover:text-[#8bb5f4] transition">Home</Link>
            <Link onClick={() => scrollAndNavigate("/about-us")} className="hover:text-[#8ec5ff] transition bg-transparent">Our Story</Link>
            <Link onClick={() => scrollAndNavigate("/join-us")} className="hover:text-[#9193ad] transition">Join Us</Link>
          </div>
        </div>

        {/* Center Spacer */}
        <div className="flex-1" />

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link onClick={() => scrollAndNavigate("/sign-in")}>
            <button className="text-neutral-800 hover:text-[#d8315b] transition font-semibold">Sign In</button>
          </Link>
          <Link onClick={() => scrollAndNavigate("/shipment-registration")}>
            <button className="bg-[#d8315b] hover:bg-[#b92549] text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="h-6 w-6 text-neutral-800" />
            ) : (
              <Menu className="h-6 w-6 text-neutral-800" />
            )}
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Overlay */}
      {isOpen && (
  <div className="fixed inset-0 bg-white/50 backdrop-blur-md z-40 flex flex-col items-center justify-center px-8 pt-[80px] pb-10 md:hidden transition-all duration-300 ease-in-out">
    <div className="flex flex-col items-center space-y-4 text-neutral-900 font-semibold">
      <button onClick={() => { setIsOpen(false); navigate('/'); }} className="text-xl hover:text-[#8bb5f4] transition">Home</button>
      <button onClick={() => { setIsOpen(false); navigate('/about-us'); }} className="text-xl hover:text-[#8ec5ff] transition">Our Story</button>
      <button onClick={() => { setIsOpen(false); navigate('/join-us'); }} className="text-xl hover:text-[#9193ad] transition">Join Us</button>
      <button onClick={() => { setIsOpen(false); navigate('/sign-in'); }} className="text-xl hover:text-[#3e92cc] transition">Sign In</button>
      <button onClick={() => { setIsOpen(false); navigate('/signup-otp'); }} className="bg-[#d8315b] hover:bg-[#b92549] text-white px-5 py-2 rounded-full text-xl font-semibold shadow">
        Get Started
      </button>
    </div>
  </div>
)}

    </>
  );
}
