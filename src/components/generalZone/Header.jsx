import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../images/Logo.png";
import '../../App.css';
import { Link } from 'react-router-dom'

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <> 
        <header className="w-full bg-white animate-fadeIn flex items-center justify-between h-10 md:h-16 px-4 shadow-md">
          {/* Left: Logo + Search */}
          <div className="flex items-center justify-between w-[25%]">
            <img src={Logo} alt="Logo" className="h-7 mx-6 md:h-10 lg:h-12" />
            <span 
            className="hidden sm:flex items-center space-x-2 p-2  text-gray-600 font-medium">
              <FaSearch className="text-gray-600 text-lg" />
              <span>search</span>
              </span>
          </div>

          {/* Menu (only on large screens) */}
          <nav className="hidden lg:block w-3/4 mx-10 ms-30">
            <ul className="flex justify-between text-gray-600 font-medium">
              <li className="relative group">
                <Link to="/"  
                className="transition-colors duration-300 hover:text-blue-600">
                  Home</Link>
                   <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
</li>
              <li className="relative group"> 
  <Link
    to="/about"
    className="transition-colors duration-300 hover:text-blue-600"
  >
    About
  </Link>
  <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
</li>

              <li className="relative group">
                <Link to="/bestplaces" className="transition-colors duration-300 hover:text-blue-600" >
                Best Places</Link>
                 <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </li>
              <li className="relative group"><Link to="/member" className="transition-colors duration-300 hover:text-blue-600" >Become a Member</Link>
               <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
</li>
              <li className="relative group"><Link to="/packages" className="transition-colors duration-300 hover:text-blue-600" >Our Packages</Link>
               <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
</li>
              <li className="me-6 relative group"><Link to="/login" className="transition-colors duration-300 hover:text-blue-600" >Login</Link>
               <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
</li>
 <li className="me-6 relative group"><Link to="/contact" className="transition-colors duration-300 hover:text-blue-600" >Contact</Link>
               <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
</li>
            </ul>
          </nav>

          {/* Hamburger icon (only visible on mobile/tablet) */}
          <div className="lg:hidden flex items-center">
            <FaBars
              className="text-gray-700 text-2xl cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
        </header>

        {/* Offcanvas Menu (slides from right) */}
        <div
          className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/2 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <img src={Logo} alt="Logo" className="h-8" />
            <FaTimes
              className="text-gray-700 text-2xl cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>

          <ul className="flex flex-col items-start p-6 space-y-4 text-gray-700 font-medium">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/bestplaces">Best Places</Link></li>
              <li><Link to="/member">Become a Member</Link></li>
              <li><Link to="/packages">Our Packages</Link></li>
              <li className="me-6"><Link to="/login">Login</Link></li>
              <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Overlay when menu is open */}
        {open && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={() => setOpen(false)}
          ></div>
        )}
    </>
  );
}

export default Header;
