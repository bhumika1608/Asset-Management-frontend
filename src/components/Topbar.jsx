import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

function Topbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/login');
  };

  const isLoggedIn = user && user.username; // ✅ fixed condition

  return (
    <div className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <img src="https://iaa.edu.in/public/admin_assets/images/other/img_logo.png" alt="IAA Logo" className="w-24 mb-4" />
      <h2 className="text-2xl font-semibold">ASSET MANAGEMENT SYSTEM - IAA</h2>


      <div className="relative">
        <FaUserCircle 
          size={30} 
          className="cursor-pointer hover:text-yellow-300"
          onClick={() => setOpen(!open)}
        />
        
        {open && (
          <div className="absolute right-0 mt-3 w-40 bg-white text-black rounded shadow-md z-50">
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Topbar;
