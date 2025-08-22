import React from 'react';
import { useParams } from 'react-router-dom';
import { useAssets } from '../context/AssetContext';
import axios from 'axios';
import MainLayout from '../components/MainLayout';
import { useUser } from '../context/UserContext';

export default function CategoryAssets() {
  const { user } = useUser();
  const { categoryName } = useParams();
  const [categoryAssets, setCategoryAssets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/assets/')
      .then(res => {
        // Filter assets by category on frontend for reliability
        const filtered = res.data.filter(a => a.category === categoryName);
        setCategoryAssets(filtered);
      })
      .catch(() => setCategoryAssets([]))
      .finally(() => setLoading(false));
  }, [categoryName]);

  return (
    <MainLayout>
      <div className="p-6" style={{ marginLeft: '16rem', marginTop: '80px' }}>
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Assets in: {categoryName}</h2>
        {loading ? (
          <p className="text-gray-600">Loading assets...</p>
        ) : (user?.isSuperuser ? categoryAssets : categoryAssets.filter(a => a.contributedBy === user?.username)).length === 0 ? (
          <p className="text-gray-600">No assets found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(user?.isSuperuser ? categoryAssets : categoryAssets.filter(a => a.contributedBy === user?.username)).map((asset, index) => (
              <div key={index} className="bg-white p-4 shadow rounded border">
                <h3 className="font-bold text-blue-700 text-lg">{asset.name}</h3>
                <p><strong>Type:</strong> {asset.type}</p>
                <p><strong>Condition:</strong> {asset.condition}</p>
                <p><strong>Location:</strong> {asset.location}</p>
                <p><strong>Date:</strong> {asset.date}</p>
                <p><strong>Quantity:</strong> {asset.quantity}</p>
                {asset.needsMaintenance && (
                  <p className="text-red-600 font-medium">⚠️ Needs Maintenance</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
