import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddAsset from './pages/AddAsset.jsx';
import AssetList from './pages/AssetList.jsx';
import Maintenance from './pages/Maintenance.jsx';
import AssetCategories from './pages/AssetCategories';
import CategoryAssets from './pages/CategoryAssets';
import AssetSummary from './pages/AssetSummary';
import Contact from './pages/Contact.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/login.jsx';
import Register from './pages/Register.jsx';
import { useUser } from './context/UserContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  const { loading } = useUser();

  if (loading) return <div className="text-center p-10 text-xl">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (left menu) */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar (profile/login/logout) */}
        <Topbar />

        {/* Page Routes */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/maintenance" element={<Maintenance />} />

            <Route
              path="/add-asset"
              element={
                <ProtectedRoute>
                  <AddAsset />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assets"
              element={
                <ProtectedRoute>
                  <AssetList />
                </ProtectedRoute>
              }
            />
            <Route path="/categories" element={<AssetCategories />} />
<Route path="/category/:categoryName" element={<CategoryAssets />} />
<Route path="/summary" element={<AssetSummary />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
