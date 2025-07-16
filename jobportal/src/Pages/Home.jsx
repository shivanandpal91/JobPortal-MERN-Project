import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner.jsx';
import Jobs from './Jobs';
import Card from '../Components/Card.jsx';
import SideBar from '../Sidebar/SideBar.jsx';
// import NewsLetter from '../Components/NewsLetter.jsx'
import Profile from '../Components/Profile.jsx';
import SavedJobs from '../Components/SavedJobs.jsx';
import TechStackFilter from '../Components/TechStackFilter.jsx';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import NewsLetter from '../Components/NewsLetter.jsx';
import { ToastContainer } from 'react-toastify';

// export default Home
const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInUserEmail');
    handleSuccess('User Loggedout');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = 'http://localhost:8080/products';
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // now create state for filters

  //for lest side bar to filter based on radio button
  const [selectedCategory, setSelectedCategory] = useState(null);

  //for job filtering
  const [jobs, setJobs] = useState([]);
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedTechStack, setSelectedTechStack] = useState(null);



const [selectedLocation, setSelectedLocation] = useState('');
const [selectedSalary, setSelectedSalary] = useState('');
const [selectedExperience, setSelectedExperience] = useState('');
const [selectedEmploymentType, setSelectedEmploymentType] = useState('');
const [selectedDatePosted, setSelectedDatePosted] = useState('');
const [selectedSalaryType, setSelectedSalaryType] = useState('');

  //for loading....
  const [isLoading, setIsLoading] = useState(true);
  // for pagination (one page can have 6 data)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8080/alljobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  // for banners  creating usestate hook and passing everything in banner
  const [query, setQuery] = useState('');
  const handleInputChanger = (event) => {
    setQuery(event.target.value);
  };

  //filtered jobs
  const filteredItems = jobs.filter((job) =>
    job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  ////----radio filter-----
  // const handleChange = (event) => {
  //   setSelectedCategory(event.target.value);
  // };

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'test1') setSelectedLocation(value);
  else if (name === 'test2') setSelectedSalary(value);
  else if (name === 'test3') setSelectedDatePosted(value);
  else if (name === 'test4') setSelectedExperience(value);
  else if (name === 'test5') setSelectedEmploymentType(value);
};


  //-------button based filtering-----
  const handleClick = (event) => {
    setSelectedSalaryType(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocationQuery(event.target.value);
  };

  const handleTechStackClick = (tech) => {
    setSelectedTechStack(tech);
  };

  // calculate the index range for PAGINATION
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // main functions for filtering


  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }

    if (locationQuery) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobLocation.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }

    if (selectedTechStack) {
      filteredJobs = filteredJobs.filter((job) =>
        job.skills?.some(
          (skill) =>
            typeof skill?.value === 'string' &&
            skill.value.toLowerCase().includes(selectedTechStack.toLowerCase())
        )
      );
    }

    if (selectedLocation) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobLocation.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }
    if (selectedSalary) {
      filteredJobs = filteredJobs.filter((job) =>
        parseInt(job.maxPrice) <= parseInt(selectedSalary)
      );
    }
    if (selectedSalaryType) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.salaryType?.toLowerCase() === selectedSalaryType.toLowerCase()
      );
    }
    if (selectedDatePosted) {
      filteredJobs = filteredJobs.filter((job) =>
        job.postingDate >= selectedDatePosted
      );
    }
    if (selectedExperience) {
      filteredJobs = filteredJobs.filter((job) =>
        job.experienceLevel.toLowerCase() === selectedExperience.toLowerCase()
      );
    }
    if (selectedEmploymentType) {
      filteredJobs = filteredJobs.filter((job) =>
        job.employmentType.toLowerCase() === selectedEmploymentType.toLowerCase()
      );
    }

    //slice the data bassed oncurrent page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  // filter on the all radio button one at a time
  // const filteredData = (jobs, selected, query) => {
  //   let filteredJobs = jobs;

  //   // filtering input items
  //   if (query) {
  //     filteredJobs = filteredItems;
  //   }

  //   if (locationQuery) {
  //     filteredJobs = filteredJobs.filter((job) =>
  //       job.jobLocation.toLowerCase().includes(locationQuery.toLowerCase())
  //     );
  //   }

  //   if (selectedTechStack) {
  //     filteredJobs = filteredJobs.filter((job) =>
  //       job.skills?.some(
  //         (skill) =>
  //           typeof skill?.value === 'string' &&
  //           skill.value.toLowerCase().includes(selectedTechStack.toLowerCase())
  //       )
  //     );
  //   }

  //   if (selected) {
  //     filteredJobs = filteredJobs.filter(
  //       ({
  //         jobLocation,
  //         maxPrice,
  //         experienceLevel,
  //         salaryType,
  //         employmentType,
  //         postingDate,
  //       }) => {
  //         return (
  //           postingDate >= selected ||
  //           jobLocation.toLowerCase() === selected.toLowerCase() ||
  //           parseInt(maxPrice) <= parseInt(selected) ||
  //           experienceLevel.toLowerCase() === selected.toLowerCase() ||
  //           salaryType.toLowerCase() === selected.toLowerCase() ||
  //           employmentType.toLowerCase() === selected.toLowerCase()
  //         );
  //       }
  //     );
  //   }
  //   //slice the data bassed oncurrent page
  //   const { startIndex, endIndex } = calculatePageRange();
  //   filteredJobs = filteredJobs.slice(startIndex, endIndex);
  //   return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  // };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen pb-10">
      <Profile loggedInUser={loggedInUser} handleLogout={handleLogout} />
      <Banner
        query={query}
        handleInputChanger={handleInputChanger}
        locationQuery={locationQuery}
        handleLocationChange={handleLocationChange}
      />

      {/*main contents*/}
      <div className="md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-10">
        <div className="bg-white p-4 rounded-2xl shadow border">
          <SideBar handleChange={handleChange} handleClick={handleClick} selectedSalaryType={selectedSalaryType}/>
        </div>

        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-md border">
          {isLoading ? (
            <p className="text-black font-bold animate-pulse">Loading...</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h1 className="text-lg font-bold mb-2">{result.length} Jobs</h1>
              <p>No Data Found</p>
            </>
          )}

          {/*pagination*/}
          {result.length >= 0 && (
            <div className="flex justify-center mt-6 space-x-8 text-sm text-gray-600">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded hover:bg-indigo-100 transition"
              >
                Previous
              </button>
              <span className="font-medium">
                Page {currentPage} of{' '}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="px-3 py-1 rounded hover:bg-indigo-100 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {/* Tech Stack Filter box */}
          <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
            <TechStackFilter
              selectedTechStack={selectedTechStack}
              setSelectedTechStack={setSelectedTechStack}
            />
          </div>

          {/* Saved Jobs box - visually separated */}
          <div className="bg-yellow-50 p-4 rounded-xl shadow border border-yellow-300 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-yellow-700 mb-3">
              Saved Jobs
            </h2>
            <SavedJobs />
          </div>
          <div className="bg-yellow-50 p-4 rounded-xl shadow border border-yellow-300 hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-yellow-700 mb-3">
              NewsLetter
            </h2>
            <NewsLetter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
