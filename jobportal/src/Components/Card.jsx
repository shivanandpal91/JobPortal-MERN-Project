// import React from 'react'
// import { Link } from 'react-router-dom'
// import { FiClock, FiMapPin, FiCalendar, FiDollarSign } from 'react-icons/fi'
// import { FaRupeeSign } from "react-icons/fa";

// const Card = ({ data }) => {
//   const {
//     _id,
//     companyName,
//     jobTitle,
//     companyLogo,
//     minPrice,
//     maxPrice,
//     salaryType,
//     jobLocation,
//     employmentType,
//     postingDate,
//     description,
//   } = data;
//  console.log("Job ID from URL:", _id);
//   return (
//     <section className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:border-blue-300 transition duration-300 mb-6 border border-transparent">
//       <Link to={`/job/${_id}`} className="flex gap-4 flex-col sm:flex-row items-start">
//         <img src={companyLogo} alt="Company Logo" className="w-20 h-20 object-contain rounded-md border border-gray-200" />
//         <div>
//           <h4 className="text-gray-700 font-medium mb-1">{companyName}</h4>
//           <h3 className="text-xl font-bold text-indigo-600 mb-2 hover:underline transition">{jobTitle}</h3>

//           <div className="text-gray-500 text-sm flex flex-wrap gap-4 mb-2">
//             <span className="flex items-center gap-1"><FiMapPin />{jobLocation}</span>
//             <span className="flex items-center gap-1"><FiClock />{employmentType}</span>
//             <span className="flex items-center gap-1"><FaRupeeSign />{minPrice}k - {maxPrice}k {salaryType}</span>
//             <span className="flex items-center gap-1"><FiCalendar />{postingDate}</span>
//           </div>

//           <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
//         </div>
//       </Link>
//     </section>
//   );
// };

// export default Card;

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiClock, FiMapPin, FiCalendar } from 'react-icons/fi'
import { FaRupeeSign, FaRegBookmark, FaBookmark } from 'react-icons/fa'

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    description,
  } = data;

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    const alreadySaved = savedJobs.some((job) => job._id === _id);
    setIsSaved(alreadySaved);
  }, [_id]);

  const handleSaveJob = (e) => {
    e.preventDefault(); // Prevents Link navigation
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];

    if (!savedJobs.some((job) => job._id === _id)) {
      savedJobs.push(data);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      setIsSaved(true);
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:border-blue-300 transition duration-300 mb-6 border border-transparent">
      <Link to={`/job/${_id}`} className="flex gap-4 flex-col sm:flex-row items-start relative">
        <img
          src={companyLogo}
          alt="Company Logo"
          className="w-20 h-20 object-contain rounded-md border border-gray-200"
        />
        <div className="flex-1">
          <h4 className="text-gray-700 font-medium mb-1">{companyName}</h4>
          <h3 className="text-xl font-bold text-indigo-600 mb-2 hover:underline transition">{jobTitle}</h3>

          <div className="text-gray-500 text-sm flex flex-wrap gap-4 mb-2">
            <span className="flex items-center gap-1"><FiMapPin />{jobLocation}</span>
            <span className="flex items-center gap-1"><FiClock />{employmentType}</span>
            <span className="flex items-center gap-1"><FaRupeeSign />{minPrice}k - {maxPrice}k {salaryType}</span>
            <span className="flex items-center gap-1"><FiCalendar />{postingDate}</span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

          <div className="mt-4">
            <button
              onClick={handleSaveJob}
              disabled={isSaved}
              className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full border ${
                isSaved
                  ? 'text-green-600 bg-green-100 border-green-200 cursor-not-allowed'
                  : 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-300'
              }`}
            >
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
              {isSaved ? 'Saved' : 'Save Job'}
            </button>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Card;
