
import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function Profile({ loggedInUser }) {
  return (
    <>
      {loggedInUser && (
        <div className="w-full flex justify-center mb-6 py-10">
          <div className="text-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 shadow-xl p-8 rounded-2xl max-w-lg w-full border border-purple-300 transform hover:scale-105 transition-all duration-300">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${loggedInUser}`}
              alt="Profile Avatar"
              className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md"
            />
            <h1 className="text-3xl font-extrabold text-purple-700 mt-4">
              Welcome, {loggedInUser}!
            </h1>
            <p className="text-gray-600 mt-2">Glad to see you again 👋</p>
            
            <Link
              to="/profile"
              className="mt-6 inline-block bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300"
            >
              View Profile
            </Link>

            <ToastContainer />
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
