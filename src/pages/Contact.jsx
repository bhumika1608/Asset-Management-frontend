import React from 'react';
import MainLayout from '../components/MainLayout';

export default function Contact() {
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row items-start justify-center min-h-screen gap-10 p-10">
        {/* Google Maps Embed */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <iframe
            title="Indian Aviation Academy Location"
            src="https://www.google.com/maps?q=Indian+Aviation+Academy,+Vasant+Kunj,+New+Delhi&output=embed"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: '12px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        {/* Contact Info */}
        <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-8 w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Contact Us</h2>
          <p className="text-gray-700 mb-6">Indian Aviation Academy, Near Indian Spinal Injuries Center, Vasant Kunj, New Delhi - 110070</p>
          <div className="space-y-3">
            <div><span className="font-semibold">Phone:</span> +91-11-26134313 (Director's Office)</div>
            <div><span className="font-semibold">Phone:</span> +91-11-26134358/59 (Academy)</div>
            <div><span className="font-semibold">Phone:</span> +91-11-26134301, +91-9315809157 (Hostel)</div>
            <div><span className="font-semibold">Website:</span> <a href="https://www.iaa.edu.in" className="text-blue-700 underline" target="_blank" rel="noopener noreferrer">www.iaa.edu.in</a></div>
            <div><span className="font-semibold">Email ID:</span> <a href="mailto:edtraining.niamar@aai.aero" className="text-blue-700 underline">edtraining.niamar@aai.aero</a></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
