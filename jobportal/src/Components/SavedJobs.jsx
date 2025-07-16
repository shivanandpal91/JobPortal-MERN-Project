import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiBookmark } from 'react-icons/fi';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  // Load saved jobs from localStorage
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setSavedJobs(storedJobs);
  }, []);

  // Remove a job from saved list
  const handleRemoveJob = (id) => {
    const updatedJobs = savedJobs.filter((job) => job._id !== id);
    setSavedJobs(updatedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FiBookmark className="text-blue-600" />
        Saved Jobs
      </h2>

      {savedJobs.length === 0 ? (
        <p className="text-gray-500 text-sm italic">You haven’t saved any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {savedJobs.map((job) => (
            <li
              key={job._id}
              className="flex justify-between items-center bg-gray-50 hover:bg-blue-50 border border-gray-200 p-3 rounded-md transition-all duration-200 shadow-sm"
            >
              <div
                onClick={() => navigate(`/job/${job._id}`)}
                className="cursor-pointer"
              >
                <h3 className="text-base font-semibold text-blue-700 hover:underline">
                  {job.jobTitle}
                </h3>
                <p className="text-sm text-gray-600">{job.companyName}</p>
              </div>
              <button
                onClick={() => handleRemoveJob(job._id)}
                className="text-red-500 hover:text-red-700 transition-all duration-150"
                title="Remove from saved"
              >
                <FiTrash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedJobs;
