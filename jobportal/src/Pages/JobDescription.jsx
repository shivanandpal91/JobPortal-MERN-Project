
// import React from 'react';
// import { useLoaderData } from 'react-router-dom';

// function JobDescription() {
//   const job = useLoaderData();

//   if (!job) return <p className="text-center py-10 text-red-500">Job not found</p>;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8 bg-white rounded-md shadow-lg mt-10">
//       <div className="flex flex-col md:flex-row items-start gap-6">
//         {job.companyLogo && (
//           <img src={job.companyLogo} alt={job.companyName} className="w-24 h-24 object-contain" />
//         )}

//         <div>
//           <h2 className="text-3xl font-bold text-purple-700 mb-2">{job.jobTitle}</h2>
//           <p className="text-gray-600 font-semibold">{job.companyName}</p>
//           <p className="text-gray-600"><span className="font-semibold">Location:</span> {job.jobLocation}</p>

//           <p className="text-gray-600 mt-1">
//             <span className="font-semibold">Salary:</span> ₹{job.minPrice}k - ₹{job.maxPrice}k ({job.salaryType})
//           </p>
//           <p className="text-gray-600 mt-1">
//             <span className="font-semibold">Employment Type:</span> {job.employmentType}
//           </p>
//           <p className="text-gray-600 mt-1">
//             <span className="font-semibold">Experience:</span> {job.experienceLevel}
//           </p>
//           <p className="text-gray-600 mt-1">
//             <span className="font-semibold">Posted On:</span> {job.postingDate}
//           </p>

//           {job.createdAt && (
//             <p className="text-gray-600 mt-1">
//               <span className="font-semibold">Created At:</span> {new Date(job.createdAt).toLocaleDateString()}
//             </p>
//           )}

//           {job.postedBy && (
//             <p className="text-gray-600 mt-1">
//               <span className="font-semibold">Posted By:</span> {job.postedBy}
//             </p>
//           )}

//           {job.skills?.length > 0 && (
//             <div className="mt-4">
//               <h3 className="font-semibold text-gray-800">Required Skills:</h3>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {job.skills.map((skill, idx) => (
//                   <span
//                     key={idx}
//                     className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
//                   >
//                     {skill.label || skill.value}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mt-6">
//         <h3 className="text-xl font-bold mb-2">Job Description</h3>
//         <p className="text-gray-700">{job.description}</p>
//       </div>

//       <div className="mt-6 flex gap-4">
//         {job.postedBy && (
//           <a
//             href={`mailto:${job.postedBy}?subject=Application%20for%20${encodeURIComponent(job.jobTitle)}&body=Hi%20there,%0A%0AI%20am%20interested%20in%20the%20${job.jobTitle}%20position%20posted%20at%20${job.companyName}.%20Please%20let%20me%20know%20how%20I%20can%20proceed%20further.%0A%0ARegards,%0A[Your Name]`}
//             className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-md"
//           >
//             Contact Recruiter
//           </a>
//         )}
//         <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md">
//           Apply Now
//         </button>
//         <button
//           onClick={() => window.print()}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md"
//         >
//           Save as PDF
//         </button>

//       </div>
//     </div>
//   );
// }

// export default JobDescription;
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

function JobDescription() {
  const job = useLoaderData();
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem("loggedInUserEmail");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const res = await fetch(`http://localhost:8080/user/${userEmail}`, {
          headers: { Authorization: token },
        });
        const data = await res.json();
        const hasApplied = data?.appliedJobs?.some((j) => j.jobId === job._id);
        setApplied(hasApplied);
      } catch (err) {
        console.error("Error checking applied jobs", err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail && token) checkIfApplied();
  }, [userEmail, token, job._id]);



  
  const handleApply = async () => {
    try {


      const appliedJob = {
        jobId: job._id,
        jobTitle: job.jobTitle,
        companyName: job.companyName,
      };
      const res =await fetch(`http://localhost:8080/user/apply/${userEmail}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ appliedJob }),
      });
     

      const result = await res.json();

      if (res.ok) {
        alert("Successfully applied to job!");
        setApplied(true);
      } else {
        alert(result.message || "Failed to apply");
      }
    } catch (err) {
      alert("Error applying for job.");
      console.error(err);
    }
  };

  if (!job) return <p className="text-center py-10 text-red-500">Job not found</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white rounded-md shadow-lg mt-10">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {job.companyLogo && (
          <img src={job.companyLogo} alt={job.companyName} className="w-24 h-24 object-contain" />
        )}

        <div>
          <h2 className="text-3xl font-bold text-purple-700 mb-2">{job.jobTitle}</h2>
          <p className="text-gray-600 font-semibold">{job.companyName}</p>
          <p className="text-gray-600"><span className="font-semibold">Location:</span> {job.jobLocation}</p>
          <p className="text-gray-600 mt-1">
            <span className="font-semibold">Salary:</span> ₹{job.minPrice}k - ₹{job.maxPrice}k ({job.salaryType})
          </p>
          <p className="text-gray-600 mt-1">
            <span className="font-semibold">Employment Type:</span> {job.employmentType}
          </p>
          <p className="text-gray-600 mt-1">
            <span className="font-semibold">Experience:</span> {job.experienceLevel}
          </p>
          <p className="text-gray-600 mt-1">
            <span className="font-semibold">Posted On:</span> {job.postingDate}
          </p>
          {job.createdAt && (
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">Created At:</span> {new Date(job.createdAt).toLocaleDateString()}
            </p>
          )}
          {job.postedBy && (
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">Posted By:</span> {job.postedBy}
            </p>
          )}
          {job.skills?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Required Skills:</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill.label || skill.value}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Job Description</h3>
        <p className="text-gray-700">{job.description}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {job.postedBy && (
          <a
            href={`mailto:${job.postedBy}?subject=Application%20for%20${encodeURIComponent(job.jobTitle)}&body=Hi%20there,%0A%0AI%20am%20interested%20in%20the%20${job.jobTitle}%20position%20posted%20at%20${job.companyName}.%20Please%20let%20me%20know%20how%20I%20can%20proceed%20further.%0A%0ARegards,%0A[Your Name]`}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-md"
          >
            Contact Recruiter
          </a>
        )}

        {!loading && (
          applied ? (
            <button className="bg-green-500 text-white px-5 py-2 rounded-md cursor-not-allowed" disabled>
              ✅ Already Applied
            </button>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md"
              onClick={handleApply}
            >
              Apply Now
            </button>
          )
        )}

        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
}

export default JobDescription;
