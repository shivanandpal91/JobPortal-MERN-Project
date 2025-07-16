// // // import React,{useState,useEffect} from 'react'
// // // import SalaryPageHeader from '../Components/SalaryPageHeader'

// // // const SalaryPage = () => {
// // //        const [searchText,setSearchText]=useState("");
// // //        const [salary,setSalary] = useState([]);

// // //        useEffect(() => {
// // //         fetch("salary.json").then(res=>res.json()).then(data=>{
// // //             setSalary(data);
// // //         })
// // //        },[searchText])

// // //        const handleSearch=()=>{
// // //         // console.log(salary)
// // //           const filter=salary.filter(job =>
// // //           {
// // //             if (job.title && typeof job.title === 'string') {
// // //             //   console.log(job)
// // //               return job.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
// // //             //   // Convert both jobTitle and searchText to lowercase for case-insensitive comparison
// // //             //   return job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
// // //             }
// // //             return false;
// // //           })

// // //           console.log(filter);
// // //           setSalary(filter);
// // //         //   setIsLoading(false);
// // //       }
// // //        console.log(searchText)
// // //   return (
// // //     <div className="max-w-wscreen-2xl bg-slate-200 container mx-auto xl:px-24 px-4">
// // //       <SalaryPageHeader title={"Explore the potential compensation for your desired role."} path={"Salary"}/>
// // //       <div className='mt-5'>
// // //         <div className='search-box py-2 text-center mb-2'>
// // //               <input type="text" name='search' id='search' className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full' onChange={e=>setSearchText(e.target.value)} />
// // //               <button onClick={handleSearch} className='bg-blue-700 text-white font-semibold px-8 py-2 rounded-sm mb-4'> Search</button>
// // //         </div>

// // //       </div>
// // //       {/*Salary display card */}
// // //       <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center'>
// // //         {
// // //             salary.map((data)=>(
            
// // //                 <div key={data.id} className='shadow px-4 py-4'>
// // //                    <h4 className='font-semibold text--xl '>{data.title}</h4>
// // //                    <p className='my-2 font-medium text-blue-500 text-lg'>{data.salary}</p>
// // //                    <div className=' flex flex-wrap gap-4'>
// // //                     <a href='/' className='underline'>{data.status}</a>
// // //                     <a href='/' className='underline'>{data.skills}</a>
// // //                    </div>
// // //                 </div>

// // //             ))
// // //         }
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default SalaryPage

// // import React, { useState, useEffect } from 'react';
// // import SalaryPageHeader from '../Components/SalaryPageHeader';

// // const SalaryPage = () => {
// //   const [searchText, setSearchText] = useState("");
// //   const [salary, setSalary] = useState([]);
// //   const [originalData, setOriginalData] = useState([]);

// //   useEffect(() => {
// //     fetch("salary.json")
// //       .then(res => res.json())
// //       .then(data => {
// //         setSalary(data);
// //         setOriginalData(data);
// //       });
// //   }, []);

// //   const handleSearch = () => {
// //     const filtered = originalData.filter(job =>
// //       job.title?.toLowerCase().includes(searchText.toLowerCase())
// //     );
// //     setSalary(filtered);
// //   };

// //   return (
// //     <div className="max-w-screen-2xl bg-gray-50 min-h-screen container mx-auto xl:px-24 px-4 py-10">
// //       <SalaryPageHeader
// //         title="Explore the potential compensation for your desired role."
// //         path="Salary"
// //       />

// //       <div className="mt-6 text-center">
// //         <input
// //           type="text"
// //           name="search"
// //           id="search"
// //           placeholder="Search job roles..."
// //           className="py-2 pl-4 border border-gray-300 rounded-md w-full lg:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           onChange={e => setSearchText(e.target.value)}
// //         />
// //         <button
// //           onClick={handleSearch}
// //           className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-md mt-4 hover:bg-blue-800 transition"
// //         >
// //           Search
// //         </button>
// //       </div>

// //       {/* Salary Cards */}
// //       <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-12">
// //         {salary.map(data => (
// //           <div key={data.id} className="bg-white shadow-md rounded-md p-6 hover:shadow-lg transition">
// //             <h4 className="text-xl font-bold text-gray-800">{data.title}</h4>
// //             <p className="text-blue-600 text-lg font-semibold mt-2">{data.salary}</p>
// //             <p className="text-sm text-gray-600 mt-1">{data.location}</p>
// //             <p className="text-sm mt-3 font-medium text-green-600">{data.status}</p>
// //             <div className="mt-4 flex flex-wrap gap-2">
// //               {data.skills?.map((skill, index) => (
// //                 <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
// //                   {skill}
// //                 </span>
// //               ))}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SalaryPage;
// import React, { useState, useEffect } from 'react';
// import SalaryPageHeader from '../Components/SalaryPageHeader';

// const SalaryPage = () => {
//   const [searchText, setSearchText] = useState("");
//   const [salary, setSalary] = useState([]);
//   const [originalData, setOriginalData] = useState([]);

//   useEffect(() => {
//     fetch("salary.json")
//       .then(res => res.json())
//       .then(data => {
//         setSalary(data);
//         setOriginalData(data);
//       });
//   }, []);

//   const handleSearch = () => {
//     const filtered = originalData.filter(job =>
//       job.title?.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setSalary(filtered);
//   };

//   return (
//     <div className="max-w-screen-2xl bg-gray-50 min-h-screen container mx-auto xl:px-24 px-4 py-10">
//       <SalaryPageHeader
//         title="Explore the potential compensation for your desired role."
//         path="Salary"
//       />

//       <div className="mt-6 text-center">
//         <input
//           type="text"
//           name="search"
//           id="search"
//           placeholder="Search job roles..."
//           className="py-2 pl-4 border border-gray-300 rounded-md w-full lg:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           onChange={e => setSearchText(e.target.value)}
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-md mt-4 hover:bg-blue-800 transition"
//         >
//           Search
//         </button>
//       </div>

//       {/* Salary Cards */}
//       <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-12">
//         {salary.map(data => (
//           <div key={data.id} className="bg-white shadow-md rounded-md p-6 hover:shadow-lg transition">
//             <h4 className="text-xl font-bold text-gray-800">{data.title}</h4>
//             <p className="text-blue-600 text-lg font-semibold mt-2">{data.salary}</p>
//             <p className="text-sm text-gray-600 mt-1">{data.location}</p>
//             <p className="text-sm mt-3 font-medium text-green-600">{data.status}</p>
//             <div className="mt-4 flex flex-wrap gap-2">
//               {data.skills?.map((skill, index) => (
//                 <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SalaryPage;
import React, { useState, useEffect } from "react";
import SalaryPageHeader from "../Components/SalaryPageHeader";

const SalaryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [salaryData, setSalaryData] = useState([]);
  const [filteredSalaryData, setFilteredSalaryData] = useState([]);

  useEffect(() => {
    fetch("salary.json")
      .then((res) => res.json())
      .then((data) => {
        setSalaryData(data);
        setFilteredSalaryData(data);
      });
  }, []);

  const handleSearch = () => {
    let filtered = salaryData;

    if (searchText.trim() !== "") {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCity !== "All") {
      filtered = filtered.filter((job) => job.location === selectedCity);
    }

    setFilteredSalaryData(filtered);
  };

  const cityOptions = ["All", ...Array.from(new Set(salaryData.map((job) => job.location)))];

  return (
    <div className="max-w-screen-2xl bg-slate-100 container mx-auto xl:px-24 px-4">
      <SalaryPageHeader
        title={"Explore salary insights for roles across the globe."}
        path={"Salary"}
      />

      {/* Filter UI */}
      <div className="mt-5 py-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search by Job Title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="py-2 pl-3 border rounded w-full lg:w-1/3 focus:outline-none"
        />

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="py-2 pl-3 border rounded w-full lg:w-1/4 bg-white"
        >
          {cityOptions.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-700 text-white font-semibold px-6 py-2 rounded hover:bg-blue-800 transition duration-200"
        >
          Filter
        </button>
      </div>

      {/* Job Cards */}
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-10">
        {filteredSalaryData.length === 0 ? (
          <p className="text-center text-lg text-gray-500 col-span-full">
            No jobs found for your criteria.
          </p>
        ) : (
          filteredSalaryData.map((job) => (
            <div key={job.id} className="bg-white shadow-lg p-5 rounded hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold text-purple-800">{job.title}</h3>
              <p className="text-green-600 mt-1">{job.salary}</p>
              <p className="text-gray-500 text-sm mt-1">{job.location}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm font-bold text-green-600  cursor-pointer">
                {job.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SalaryPage;
