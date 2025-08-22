import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Always allow superuser login
    if (username === 'IAA_superuser' && password === 'IAAsuperuser1234') {
      login(username, password);
      navigate('/profile');
      return;
    }
    // For normal users, check registration
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      // Store isSuperuser as false for normal users
      localStorage.setItem('loggedInUser', JSON.stringify({ username, isSuperuser: false }));
      login(username, password);
      navigate('/profile');
    } else {
      alert("Invalid credentials. Please register first.");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50" style={{ marginLeft: '16rem', width: 'calc(100% - 16rem)' }}>
        {/* Topbar with IAA logo and title */}
        <div className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
          <img src="https://iaa.edu.in/public/admin_assets/images/other/img_logo.png" alt="IAA Logo" className="w-24 mb-4" />
          <h2 className="text-2xl font-semibold">ASSET MANAGEMENT SYSTEM - IAA</h2>
        </div>
      </div>
      <div className="flex justify-center items-center min-h-screen" style={{ marginLeft: '16rem', marginTop: '80px' }}>
        <div className="bg-white shadow-md p-8 rounded w-80">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-blue-700 hover:bg-blue-800 text-white w-full py-2 rounded"
          >
            Login
          </button>
          <p className="text-sm mt-3 text-center">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
