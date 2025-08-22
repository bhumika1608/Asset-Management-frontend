import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAssets } from '../context/AssetContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

export default function AddAsset() {
  const { user } = useUser();
  const { addAsset } = useAssets();
  const navigate = useNavigate();

  const [asset, setAsset] = useState({
    name: '',
    category: '',
    condition: '',
    location: '',
    date: '',
    quantity: '',
    maintenanceQuantity: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;
    setAsset((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(asset.maintenanceQuantity) > Number(asset.quantity)) {
      alert('Maintenance quantity cannot be more than total quantity!');
      return;
    }

  const assetWithUser = { ...asset, contributedBy: user.username };

    try {
      // Send to backend
      await axios.post('http://localhost:8000/api/assets/', assetWithUser);

      alert('✅ Asset added!');
      setAsset({
        name: '',
        category: '',
        condition: '',
        location: '',
        date: '',
        quantity: '',
        maintenanceQuantity: 0,
      });
    } catch (error) {
      console.error('Error adding asset:', error);
      alert('❌ Failed to add asset');
    }
  };

  return (
    <MainLayout>
      <div className="relative w-full min-h-screen flex items-start justify-center px-4 py-6">
  {/* Removed page-specific background image. Video background is handled by MainLayout. */}
        <div className="relative z-10 w-full max-w-lg mx-auto bg-white/90 backdrop-blur-md shadow-lg rounded-2xl px-6 py-5">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">✈️ Add New Asset</h2>
          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <input name="name" value={asset.name} onChange={handleChange} placeholder="Asset Name" className="w-full border border-gray-300 p-2 rounded" required />
            <select name="category" value={asset.category} onChange={handleChange} className="w-full border p-2 rounded" required>
              <option value="">-- Select Category --</option>
              <option value="Aircraft">🛩️ Aircraft</option>
              <option value="Ground Equipment">🧰 Ground Equipment</option>
              <option value="Training Tools">📚 Training Tools</option>
              <option value="IT Infrastructure">💻 IT Infrastructure</option>
            </select>
            <input name="condition" value={asset.condition} onChange={handleChange} placeholder="Condition" className="w-full border border-gray-300 p-2 rounded" />
            <input name="location" value={asset.location} onChange={handleChange} placeholder="Location" className="w-full border border-gray-300 p-2 rounded" />
            <div className="flex gap-2">
              <input name="date" type="date" value={asset.date} onChange={handleChange} className="w-1/2 border border-gray-300 p-2 rounded" />
              <input name="quantity" type="number" min="1" value={asset.quantity} onChange={handleChange} placeholder="Quantity" className="w-1/2 border border-gray-300 p-2 rounded" />
            </div>
            <div>
              <label htmlFor="maintenanceQuantity" className="block text-gray-700 mb-1">Maintenance Quantity</label>
              <input name="maintenanceQuantity" id="maintenanceQuantity" type="number" min="0" max={asset.quantity || undefined} value={asset.maintenanceQuantity} onChange={handleChange} placeholder="e.g. 2" className="w-full border border-gray-300 p-2 rounded" />
            </div>
            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded font-semibold transition duration-200">
              Add Asset
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
