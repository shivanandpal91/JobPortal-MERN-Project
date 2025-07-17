
// //using useNavigate
// import React from 'react';
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import app from '../firbase/firebase.config';
// import { getAuth } from "firebase/auth";
// import { useNavigate } from 'react-router-dom';  // Import useNavigate

// const Login = () => {
//   const auth = getAuth();
//   const googleProvider = new GoogleAuthProvider();
//   const navigate = useNavigate();  // Initialize useNavigate

//   const handleLogin = () => {
//     signInWithPopup(auth, googleProvider)
//       .then((result) => {
//         // The signed-in user info
//         const user = result.user;

//         // Navigate to the home page after successful login
//         navigate("/home");  // Redirect to the home page

//       }).catch((error) => {
//         const errorMessage = error.message;
//         const email = error.customData.email;
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         console.log(errorMessage, email, credential);  // Log the error
//       });
//   };

//   return (
//     <div className="h-screen w-full flex items-center justify-center bg-slate-200 px-10 py-4 text-white">
//       <button className="bg-slate-600 px-10 py-4 text-white" onClick={handleLogin}>
//         Login
//       </button>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required');
    }

    try {
      const response = await fetch(`https://job-portal-server-api.vercel.app/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, email, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('loggedInUserEmail', email);
        setTimeout(() => navigate('/home'), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || 'Validation error');
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-purple-100 via-white to-purple-200">
      <div className="bg-white shadow-2xl rounded-lg p-10 w-full max-w-md border border-purple-200">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">Welcome Back</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-md font-medium text-gray-700 block mb-1">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={loginInfo.email}
              placeholder="e.g. user@example.com"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-200"
            />
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <label htmlFor="password" className="text-md font-medium text-gray-700 block mb-1">
              Password
            </label>
            <input
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={loginInfo.password}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition duration-200 pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-[42px] right-3 text-gray-500 cursor-pointer hover:text-purple-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition duration-200 text-white font-semibold py-2.5 px-4 rounded-md shadow hover:shadow-md"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-purple-600 font-medium hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
