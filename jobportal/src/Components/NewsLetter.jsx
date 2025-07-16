import React, { useState } from 'react';
import { FaEnvelopeOpenText } from 'react-icons/fa6';
import { handleSuccess, handleError } from '../utils';
import { ToastContainer } from 'react-toastify';

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      handleError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        handleSuccess(data.message || "Subscription successful!");
        setEmail("");
      } else {
        handleError(data.message || "Subscription failed!");
      }
    } catch (err) {
      console.error(err);
      handleError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 rounded-lg shadow-lg max-w-xl mx-auto my-12">
      <h3 className='text-2xl font-bold mb-4 flex items-center gap-2 text-indigo-700'>
        <FaEnvelopeOpenText />
        Subscribe for Job Updates
      </h3>

      <p className='text-gray-600 mb-4'>
        Get the latest job alerts directly to your inbox. Enter your email and stay informed!
      </p>

      <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="email@example.com"
          className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-2 rounded-md transition"
        >
          Subscribe
        </button>
      </form>
      <ToastContainer />
    </div>
  );

};

export default NewsLetter;
