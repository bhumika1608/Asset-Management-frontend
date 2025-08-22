import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import axios from 'axios';
import { useAssets } from '../context/AssetContext';
import { useUser } from '../context/UserContext';

export default function AssetList() {
  // Handle edit button click
  const handleEdit = (index) => {
    setEditIndex(index);
    setEdited({
      name: assets[index].name,
      quantity: assets[index].quantity,
      maintenanceQuantity: assets[index].maintenanceQuantity,
    });
  };

  // Handle save button click
  const saveEdit = () => {
    if (editIndex === null) return;
    const updatedAsset = {
      ...assets[editIndex],
      name: edited.name,
      quantity: edited.quantity,
      maintenanceQuantity: edited.maintenanceQuantity,
    };
    updateAsset(editIndex, updatedAsset);
    setEditIndex(null);
    setEdited({});
  };
  const { assets, updateAsset } = useAssets();
  const { user } = useUser();
  const [editIndex, setEditIndex] = useState(null);
  const [edited, setEdited] = useState({});

  // Fetch assets from backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/assets/')
      .then(response => {
        // ...existing code...
      });
  }, []);

  return (
    <MainLayout>
      <div className="relative w-full min-h-screen flex items-start justify-center px-4 py-6">
    {/* Removed page-specific background image. MainLayout provides the background. */}
        <div className="relative z-10 w-full max-w-6xl mx-auto bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">📋 Asset List</h2>
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-lg">
              <thead className="bg-blue-100 text-gray-800">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Category</th>
                  <th className="p-3 border">Condition</th>
                  <th className="p-3 border">Location</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Qty</th>
                  <th className="p-3 border">Maintenance</th>
                  <th className="p-3 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(user?.isSuperuser
                  ? assets
                  : assets.filter(a => a.contributedBy === user?.username)
                ).map((asset, index) => (
                  <tr key={index} className="border-t hover:bg-blue-50 transition duration-100">
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">
                      {editIndex === index ? (
                        <input
                          value={edited.name}
                          onChange={(e) => setEdited({ ...edited, name: e.target.value })}
                          className="border border-gray-300 rounded p-1 w-full"
                        />
                      ) : (
                        asset.name
                      )}
                    </td>
                    <td className="p-2 border">{asset.category}</td>
                    <td className="p-2 border">{asset.condition}</td>
                    <td className="p-2 border">{asset.location}</td>
                    <td className="p-2 border">{asset.date}</td>
                    <td className="p-2 border">
                      {editIndex === index ? (
                        <input
                          type="number"
                          min="1"
                          value={edited.quantity}
                          onChange={(e) => setEdited({ ...edited, quantity: Number(e.target.value) })}
                          className="border border-gray-300 rounded p-1 w-20"
                        />
                      ) : (
                        asset.quantity
                      )}
                    </td>
                    <td className="p-2 border text-center">
                      {editIndex === index ? (
                        <input
                          type="number"
                          min="0"
                          max={edited.quantity || 1}
                          value={edited.maintenanceQuantity}
                          onChange={(e) =>
                            setEdited({
                              ...edited,
                              maintenanceQuantity: Number(e.target.value),
                            })
                          }
                          className="border border-gray-300 rounded p-1 w-20 text-center"
                        />
                      ) : (
                        <span className="text-sm font-medium">
                          {asset.maintenanceQuantity || 0} / {asset.quantity}
                        </span>
                      )}
                    </td>
                    <td className="p-2 border space-x-2 text-center">
                      {editIndex === index ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditIndex(null)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

