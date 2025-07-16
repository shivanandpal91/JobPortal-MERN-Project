import React from 'react';
const SalaryPageHeader = ({ title, path }) => {
  return (
    <div className="py-8 mt-6 bg-gradient-to-r from-green-200 via-yellow-100 to-blue-200 rounded-md shadow-md text-center">
      <h2 className="text-4xl font-extrabold text-blue-900 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">
        <a href="/" className="hover:underline text-blue-700">Home</a> / {path}
      </p>
    </div>
  );
};
export default SalaryPageHeader;
