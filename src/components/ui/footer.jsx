import React, { useState } from 'react';
import { Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [email,setEmail] = useState('');
  const [status,setStatus] = useState(null);

  const scrollToTop = () =>{
    window.scrollTo({
      top:0,
      behavior:'smooth',
    });
  };

  const handleSubscribe = async() =>{
    if(!email){
      setStatus('please enter a valid email');
      return ;
    }

    try{
      const res = await fetch('https://your-api-url.com/api/subscribe',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email})
      } ) ;

      if(res.ok){
        setStatus('subscription successful');
        setEmail('');
      }
      else{
        setStatus('subscription failed, please try again');
      }
    }
    catch{
        setStatus('an error occurred');
      }
  };

  return (
    <footer className="w-full bg-[#f9f7f8] text-[#1e1b18] pt-10 pb-6 px-6 md:px-20">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        
        {/* Get in Touch */}
        <div>
          <h4 className="font-bold text-lg mb-3">GET IN TOUCH</h4>
          <div className="space-y-3">
            <a href="mailto:contact@logixjunction.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1DA1F2]"> contact@logixjunction.com </a>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="font-bold text-lg mb-3">FOLLOW US</h4>
          <div className="space-y-3">
            <a href="#" className="flex items-center space-x-2 hover:text-[#1DA1F2]">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="flex items-center space-x-2 hover:text-[#0077B5]">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="flex items-center space-x-2 hover:text-[#e60076]">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Our Story */}
        <div>
          <h4 className="font-bold text-lg mb-3">OUR STORY</h4>
          <a href="about-us" className="hover:text-[#1DA1F2]">About Us</a>
        </div>

        {/* Insights */}
        <div>
          <h4 className="font-bold text-lg mb-3">INSIGHTS</h4>
          <a href="/join-us" className="hover:text-[#1DA1F2]">Careers</a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Legal Info */}
        <div className="text-sm text-gray-600">
          <p>©2025 LxJ</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <a href="#" className="hover:text-[#1e1b18]">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-[#1e1b18]">Terms</a>
            <span>·</span>
            <a href="# " className="hover:text-[#1e1b18]">Cookies</a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-lg font-bold mb-3">STAY UPDATED</h5>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="email"
              placeholder="Enter email ID"
              className="px-3 py-2 rounded-md border border-gray-300 text-sm w-full sm:w-auto"
              onChange={(e)=> setEmail(e.target.value)} 
            />
            <button className="bg-[#d8315b] hover:bg-[#ff2056] text-white px-4 py-2 rounded-md text-sm" onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>
          {status && (
            <div className="mt-2 text-sm text-red-600">{status}</div>
          )}
        </div>

        {/* Back to Top */}
        <div className="flex justify-end md:justify-end md:mt-8">
          <button onClick={scrollToTop} className="inline-flex items-center px-3 py-2 rounded-xl text-white bg-gradient-to-r from-blue-300 to-indigo-600 shadow hover:from-indigo-600 hover:to-blue-300">
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
