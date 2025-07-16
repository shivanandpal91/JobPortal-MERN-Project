
import React from 'react'
import {FiMapPin, FiSearch} from 'react-icons/fi'


const Banner = ({ query, handleInputChanger, locationQuery, handleLocationChange }) => {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-cyan-100 to-blue-50 py-20 px-6 md:px-24 rounded-b-3xl shadow-sm">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-snug mb-3">
          Discover <span className="text-blue-600">Your Dream Job</span> Today
        </h1>
        <p className="text-md md:text-lg text-gray-700 mb-10">
          Unlock career opportunities in top companies across the IT industry.
        </p>

        <form>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            {/* Job Title Input */}
            <div className="relative w-full md:w-[60%]">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search job roles (e.g., Frontend Developer)"
                value={query}
                onChange={handleInputChanger}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition"
              />
            </div>

            {/* Functional Location Input */}
            <div className="relative w-full md:w-[35%]">
              <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Location (e.g., Bangalore)"
                value={locationQuery}
                onChange={handleLocationChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Banner;
