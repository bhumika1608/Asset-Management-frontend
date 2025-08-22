import React from 'react';
import { useAssets } from '../context/AssetContext';

import MainLayout from '../components/MainLayout';

export default function AssetSummary() {
  const { assets } = useAssets();

  // Group assets by name with quantity and maintenance count
  const summary = assets.reduce((acc, asset) => {
    const key = asset.name;
    if (!acc[key]) {
      acc[key] = {
        totalQty: 0,
        maintenanceQty: 0,
      };
    }
    acc[key].totalQty += Number(asset.quantity || 0);
    acc[key].maintenanceQty += Number(asset.maintenanceQuantity || 0);
    return acc;
  }, {});

  const assetNames = Object.keys(summary);

  return (
    <MainLayout>
      <div className="relative w-full min-h-screen flex items-start justify-center px-4 py-6">
  {/* Removed page-specific background image. Video background is handled by MainLayout. */}
        <div className="relative z-10 w-full max-w-5xl mx-auto bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">📊 Asset Summary Report</h2>
          <>
            {assetNames.length === 0 ? (
              <p className="text-center text-gray-600">No assets added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-left text-sm rounded-lg overflow-hidden">
                  <thead className="bg-blue-100 text-gray-800 text-md">
                    <tr>
                      <th className="p-3 border">#</th>
                      <th className="p-3 border">Asset Name</th>
                      <th className="p-3 border">Total Quantity</th>
                      <th className="p-3 border">Needs Maintenance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetNames.map((name, index) => (
                      <tr key={index} className="border-t hover:bg-blue-50 transition duration-100">
                        <td className="p-3 border">{index + 1}</td>
                        <td className="p-3 border">{name}</td>
                        <td className="p-3 border font-semibold text-blue-700">
                          {summary[name].totalQty}
                        </td>
                        <td className="p-3 border font-semibold text-red-600">
                          {summary[name].maintenanceQty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        </div>
      </div>
    </MainLayout>
  );
            <table className="w-full border border-gray-300 text-left text-sm rounded-lg overflow-hidden">
              <thead className="bg-blue-100 text-gray-800 text-md">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Asset Name</th>
                  <th className="p-3 border">Total Quantity</th>
                  <th className="p-3 border">Needs Maintenance</th>
                </tr>
              </thead>
              <tbody>
                {assetNames.map((name, index) => (
                  <tr key={index} className="border-t hover:bg-blue-50 transition duration-100">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{name}</td>
                    <td className="p-3 border font-semibold text-blue-700">
                      {summary[name].totalQty}
                    </td>
                    <td className="p-3 border font-semibold text-red-600">
                      {summary[name].maintenanceQty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          
        }
      
    
