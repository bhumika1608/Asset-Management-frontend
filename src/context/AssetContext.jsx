import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);

  // ✅ Fetch assets from Django on load
  useEffect(() => {
    axios.get('http://localhost:8000/api/assets/')
      .then((res) => setAssets(res.data))
      .catch((err) => console.error('Error fetching assets:', err));
  }, []);

  // ✅ Add asset to DB
  const addAsset = (asset) => {
    axios.post('http://localhost:8000/api/assets/', asset)
      .then((res) => setAssets((prev) => [...prev, res.data]))
      .catch((err) => {
        console.error('Failed to add asset:', err);
        alert("Failed to add asset.");
      });
  };

  // ✅ Update asset in DB
  const updateAsset = (index, updatedAsset) => {
    const assetId = assets[index].id;

    axios.put(`http://localhost:8000/api/assets/${assetId}/`, updatedAsset)
      .then((res) => {
        const newAssets = [...assets];
        newAssets[index] = res.data;
        setAssets(newAssets);
      })
      .catch((err) => {
        console.error('Failed to update asset:', err);
        alert("Failed to update asset.");
      });
  };

  return (
    <AssetContext.Provider value={{ assets, addAsset, updateAsset }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => useContext(AssetContext);
