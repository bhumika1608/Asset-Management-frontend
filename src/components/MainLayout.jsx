import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden relative">
      {/* Gradient Background with SVG Airplane Icon */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-blue-200 via-white to-blue-400 absolute top-0 left-0" />
        <svg className="absolute right-20 bottom-10 opacity-30" width="180" height="180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 16l20-5-20-5v4l15 1-15 1v4z" fill="#2563eb" />
          <circle cx="20" cy="19" r="2" fill="#2563eb" />
        </svg>
        <svg className="absolute left-10 top-10 opacity-20" width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 16l20-5-20-5v4l15 1-15 1v4z" fill="#2563eb" />
        </svg>
      </div>
      {/* Sidebar first */}
      <Sidebar />
      {/* Topbar starts after sidebar, not behind */}
      <div className="fixed top-0 z-50" style={{ left: '16rem', width: 'calc(100% - 16rem)' }}>
        <Topbar />
      </div>
      <main className="flex-1 min-h-screen bg-transparent ml-64 relative z-20" style={{ marginTop: '80px' }}>
        {children}
      </main>
    </div>
  );
}
