import React from 'react';
import { useUser } from '../context/UserContext';
import { useAssets } from '../context/AssetContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import MainLayout from '../components/MainLayout';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Profile() {
  const { user } = useUser();
  const { assets } = useAssets();

  const userAssets = user?.isSuperuser
    ? assets
    : assets.filter(asset => asset.contributedBy === user?.username);

  const totalQuantity = userAssets.reduce((sum, asset) => sum + Number(asset.quantity || 0), 0);
  const totalMaintenanceQuantity = userAssets.reduce((sum, asset) => sum + Number(asset.maintenanceQuantity || 0), 0);

  // ✅ Pie Chart Data
  const data = {
    labels: ['Total Quantity', 'Maintenance Quantity'],
    datasets: [
      {
        data: [totalQuantity, totalMaintenanceQuantity],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  // Maintenance percentage for display
  const maintenancePercent = totalQuantity > 0 ? ((totalMaintenanceQuantity / totalQuantity) * 100).toFixed(2) : 0;

  return (
    <MainLayout>
      <div className="relative w-full h-full flex items-start justify-center px-4 py-6">
        {/* Background image */}
  {/* Removed page-specific background image. Video background is handled by MainLayout. */}
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6 overflow-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            User Profile
          </h1>
          {/* Stats section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 shadow-inner p-6 rounded-lg border border-blue-100">
              <h2 className="text-gray-500 text-sm mb-1">Username</h2>
              <p className="text-lg font-semibold text-blue-800">{user?.username}</p>
            </div>
            <div className="bg-green-50 shadow-inner p-6 rounded-lg border border-green-100">
              <h2 className="text-gray-500 text-sm mb-1">Total Assets Added</h2>
              <p className="text-lg font-semibold text-green-700">{userAssets.length}</p>
            </div>
            <div className="bg-yellow-50 shadow-inner p-6 rounded-lg border border-yellow-100">
              <h2 className="text-gray-500 text-sm mb-1">Maintenance %</h2>
              <p className="text-lg font-semibold text-yellow-700">
                {maintenancePercent}%
              </p>
            </div>
          </div>
          {/* ✅ Pie Chart Section */}
          <div className="bg-white shadow-md rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
              📊 Asset Overview
            </h2>
            <div className="w-64 mx-auto">
              <Pie data={data} />
            </div>
          </div>
          {/* Contributed Assets */}
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">
            📦 Contributed Assets
          </h2>
          {userAssets.length === 0 ? (
            <div className="bg-white/70 p-6 rounded-lg text-center text-gray-600">
              You haven't added any assets yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {userAssets.map((asset, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-bold text-blue-800 mb-1">{asset.name}</h3>
                  <p className="text-sm"><span className="font-semibold">Type:</span> {asset.type}</p>
                  <p className="text-sm"><span className="font-semibold">Condition:</span> {asset.condition}</p>
                  <p className="text-sm"><span className="font-semibold">Location:</span> {asset.location}</p>
                  <p className="text-sm"><span className="font-semibold">Date:</span> {asset.date}</p>
                  {Number(asset.maintenanceQuantity) > 0 && (
                    <p className="text-xs text-red-600 font-medium mt-2">⚠️ Maintenance Required ({asset.maintenanceQuantity})</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
