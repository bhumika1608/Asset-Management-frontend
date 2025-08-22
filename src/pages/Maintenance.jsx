import React, { useState, useEffect } from 'react';
import { useAssets } from '../context/AssetContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

export default function Maintenance() {
  const { assets, updateAsset } = useAssets();
  const { user } = useUser();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const maintenanceAssets = user?.isSuperuser
    ? assets.filter(asset => asset.maintenanceQuantity > 0)
    : assets.filter(asset => asset.maintenanceQuantity > 0 && asset.contributedBy === user?.username);

  const handleChange = (index, value) => {
    const safeValue = Math.max(0, Number(value));
    setInputs((prev) => ({ ...prev, [index]: safeValue }));
  };

  const handleUpdate = (index, asset) => {
    const fixed = Number(inputs[index] || 0);
    if (fixed <= 0 || fixed > asset.maintenanceQuantity) {
      alert("Enter a valid number of items fixed.");
      return;
    }

    const updated = {
      ...asset,
      maintenanceQuantity: asset.maintenanceQuantity - fixed,
    };

    updateAsset(index, updated);
    setInputs((prev) => ({ ...prev, [index]: '' }));
  };

  return (
    <MainLayout>
      <div className="relative w-full min-h-screen flex items-start justify-center px-4 py-6">
  {/* Removed page-specific background image. Video background is handled by MainLayout. */}
        <div className="relative z-10 w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6">
          <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
            🛠️ Maintenance Schedule
          </h1>
          {maintenanceAssets.length === 0 ? (
            <div className="text-center text-gray-600 text-lg bg-white/70 p-4 rounded-lg shadow-inner">
              No assets require maintenance right now.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full bg-white text-sm border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="py-3 px-4">Asset Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Condition</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Needs Maintenance</th>
                    <th className="py-3 px-4">Fixed Qty</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceAssets.map((asset, i) => {
                    const fullIndex = assets.findIndex(
                      a => a.name === asset.name &&
                           a.date === asset.date &&
                           a.location === asset.location
                    );
                    return (
                      <tr key={i} className="border-b hover:bg-blue-50 transition duration-100">
                        <td className="py-2 px-4">{asset.name}</td>
                        <td className="py-2 px-4">{asset.category}</td>
                        <td className="py-2 px-4">{asset.location}</td>
                        <td className="py-2 px-4">{asset.condition}</td>
                        <td className="py-2 px-4">{asset.date}</td>
                        <td className="py-2 px-4 font-semibold text-red-700">
                          {asset.maintenanceQuantity}
                        </td>
                        <td className="py-2 px-4">
                          <input
                            type="number"
                            min="1"
                            max={asset.maintenanceQuantity}
                            value={inputs[fullIndex] || ''}
                            onChange={(e) => handleChange(fullIndex, e.target.value)}
                            className="border border-gray-300 rounded p-1 w-20 text-center"
                          />
                        </td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleUpdate(fullIndex, asset)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow"
                          >
                            Mark Done
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
