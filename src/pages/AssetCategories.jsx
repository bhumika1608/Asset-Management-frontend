import React from 'react';
import { Link } from 'react-router-dom';

import MainLayout from '../components/MainLayout';

const categories = [
  { name: 'Aircraft', icon: '🛩️' },
  { name: 'Ground Equipment', icon: '🧰' },
  { name: 'Training Tools', icon: '📚' },
  { name: 'IT Infrastructure', icon: '💻' },
];

export default function AssetCategories() {
  return (
    <MainLayout>
      <div className="relative w-full min-h-screen flex items-start justify-center px-4 py-6">
        {/* Removed page-specific background image. MainLayout provides the background. */}
        <div className="relative z-10 w-full max-w-5xl mx-auto bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Asset Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <Link
                to={`/category/${encodeURIComponent(cat.name)}`}
                key={index}
                className="bg-white shadow-lg hover:shadow-xl border rounded-lg p-6 text-center transition"
              >
                <div className="text-4xl mb-2">{cat.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
