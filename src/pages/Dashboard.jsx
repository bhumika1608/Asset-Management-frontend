import React from 'react';
import MainLayout from '../components/MainLayout';
import { FaGraduationCap, FaGlobe, FaShieldAlt, FaChalkboardTeacher } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="relative w-full h-full flex items-start justify-center px-4 py-6">
        {/* Removed page-specific background image. MainLayout provides the background. */}
        <div className="max-w-6xl mx-auto h-full flex flex-col justify-center items-center bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-2 text-center">
            Indian Aviation Academy (IAA)
          </h1>
          <p className="text-gray-700 text-center text-md mb-6 max-w-3xl">
            The Indian Aviation Academy (IAA) is India's premier institute for aviation training, operated jointly by AAI, DGCA, and BCAS.
          </p>
          {/* Info Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 w-full max-w-4xl">
            <InfoCard icon={<FaGraduationCap />} title="Training" desc="Ops, safety, navigation" />
            <InfoCard icon={<FaGlobe />} title="Global Ties" desc="International programs" />
            <InfoCard icon={<FaShieldAlt />} title="Security" desc="Safe air transport" />
            <InfoCard icon={<FaChalkboardTeacher />} title="Faculty" desc="Expert professionals" />
          </div>
          {/* Highlights List (no scroll) */}
          <div className="bg-blue-50 w-full max-w-3xl p-4 rounded-lg shadow-inner text-sm">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Key Highlights</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>State-of-the-art campus in New Delhi</li>
              <li>Certification with national/international bodies</li>
              <li>Simulated real-world learning environments</li>
              <li>Empowering India’s civil aviation future</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function InfoCard({ icon, title, desc }) {
  return (
    <div className="bg-blue-100 text-blue-900 rounded-lg p-4 flex flex-col items-center text-center shadow hover:shadow-md transition">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-bold text-md">{title}</h3>
      <p className="text-sm">{desc}</p>
    </div>
  );
}
