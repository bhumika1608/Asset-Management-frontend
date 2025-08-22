import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';

function Sidebar() {
  const { user, logout } = useUser();

  const isLoggedIn = user && user.username; // ✅ safe check

  return (
  <div className="w-64 h-screen fixed top-0 left-0 bg-blue-900 text-white p-6 overflow-y-auto z-50">
      <h2 className="text-xl font-bold mb-6">Asset Manager</h2>
      <ul className="space-y-4">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/assets">Asset List</Link></li>
        <li><Link to="/add-asset">Add Asset</Link></li>
        <li><Link to="/maintenance">Maintenance</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/summary">Asset Summary</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        


        {isLoggedIn && (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <button onClick={logout} className="text-red-300 hover:text-white">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
