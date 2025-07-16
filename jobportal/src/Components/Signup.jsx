// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';

// function Signup() {

//     const [signupInfo, setSignupInfo] = useState({
//         name: '',
//         email: '',
//         password: ''
//     })

//     const navigate = useNavigate();
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         const copySignupInfo = { ...signupInfo };
//         copySignupInfo[name] = value;
//         setSignupInfo(copySignupInfo);
//     }

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         const { name, email, password } = signupInfo;
//         if (!name || !email || !password) {
//             return handleError('name, email and password are required')
//         }
//         try {
//             const url = `http://localhost:8080/auth/signup`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(signupInfo)
//             });
//             const result = await response.json();
//             const { success, message, error } = result;
//             if (success) {
//                 handleSuccess(message);
//                 setTimeout(() => {
//                     navigate('/login')
//                 }, 1000)
//             } else if (error) {
//                 const details = error?.details[0].message;
//                 handleError(details);
//             } else if (!success) {
//                 handleError(message);
//             }
//         } catch (err) {
//             handleError(err);
//         }
//     }

//     return (
//         <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
//             <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
//                 <h1 className='text-2xl font-bold mb-6 text-center'>Signup</h1>
//                 <form onSubmit={handleSignup} className='space-y-4'>
//                     <div className='flex flex-col'>
//                         <label htmlFor='name' className='mb-1 font-medium'>Name</label>
//                         <input
//                             onChange={handleChange}
//                             type='text'
//                             name='name'
//                             autoFocus
//                             placeholder='Enter your name...'
//                             value={signupInfo.name}
//                             className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
//                         />
//                     </div>
//                     <div className='flex flex-col'>
//                         <label htmlFor='email' className='mb-1 font-medium'>Email</label>
//                         <input
//                             onChange={handleChange}
//                             type='email'
//                             name='email'
//                             placeholder='Enter your email...'
//                             value={signupInfo.email}
//                             className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
//                         />
//                     </div>
//                     <div className='flex flex-col'>
//                         <label htmlFor='password' className='mb-1 font-medium'>Password</label>
//                         <input
//                             onChange={handleChange}
//                             type='password'
//                             name='password'
//                             placeholder='Enter your password...'
//                             value={signupInfo.password}
//                             className='border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500'
//                         />
//                     </div>
//                     <button type='submit' className='w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition'>
//                         Signup
//                     </button>
//                     <p className='text-sm mt-2 text-center'>
//                         Already have an account? <Link to="/login" className='text-purple-600 hover:underline'>Login</Link>
//                     </p>
//                 </form>
//                 <ToastContainer />
//             </div>
//         </div>
//     )
// }

// export default Signup;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }

    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || 'Validation error');
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Create an Account</h1>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-gray-700">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="John Doe"
              value={signupInfo.name}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="you@example.com"
              value={signupInfo.email}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password with show/hide toggle */}
          <div className="flex flex-col relative">
            <label htmlFor="password" className="mb-1 font-medium text-gray-700">Password</label>
            <input
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={signupInfo.password}
              className="border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[42px] text-gray-500 hover:text-purple-600 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Sign Up
          </button>

          {/* Link to Login */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
