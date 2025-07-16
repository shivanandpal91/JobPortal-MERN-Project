import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const About = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-100 to-purple-100 border-t border-gray-300 mt-12 py-8">
      <div className="max-w-screen-xl mx-auto px-4 text-center text-gray-800 text-sm">
        {/* Project Description */}
        <p className="mb-3 font-medium">
          📌 <strong>JobPortal</strong> is a full-stack web application where users can post, browse, filter, and apply for jobs efficiently.
        </p>

        {/* Credits */}
        <p className="mb-2">
          🛠 Built by <span className="text-blue-700 font-semibold">Shivanand Pal</span>
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-5 mt-3 text-xl">
          <a href="https://github.com/shivanandpal91" target="_blank" rel="noreferrer" className="hover:text-black transition">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/shivanandpal91/" target="_blank" rel="noreferrer" className="hover:text-blue-700 transition">
            <FaLinkedin />
          </a>
          <a href="mailto:externalemail2024@gmail.com" className="hover:text-red-500 transition">
            <FaEnvelope />
          </a>
        </div>

        {/* Tech Stack */}
        <div className="mt-4 text-gray-700">
          <p><strong>Tech Stack:</strong> React.js · Node.js · Express.js · MongoDB · Tailwind CSS</p>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-gray-500 text-xs">© {new Date().getFullYear()} Shivanand. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default About;
