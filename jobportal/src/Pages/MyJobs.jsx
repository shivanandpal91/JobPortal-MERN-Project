import {React,useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Profile from '../Components/Profile';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const MyJobs = () => {
  // const eamil =""
    const userEmail = localStorage.getItem("loggedInUserEmail");

    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();
      useEffect(() => {
          setLoggedInUser(localStorage.getItem('loggedInUser'))
      }, [])
  
      const handleLogout = (e) => {
          localStorage.removeItem('token');
          localStorage.removeItem('loggedInUser');
          localStorage.removeItem('loggedInUserEmail');
          handleSuccess('User Loggedout');
          setTimeout(() => {
              navigate('/login');
          }, 1000)
      }
  const [jobs,setJobs]=useState([]);
  const [searchText,setSearchText]=useState("");
  const [isLoading,setIsLoading]=useState(true);


  //set currentpadge
  const [currentPage,setCurrentPage]=useState(1);
  const itemsPerPage =4;
  useEffect(() =>{
      setIsLoading(true);
      fetch(`https://job-portal-server-api.vercel.app/myJobs/${userEmail}`)
      // fetch("../public/jobs.json")
      .then(res=>res.json())
      .then(data=>{setJobs(data);
        setIsLoading(false);
      })
  },[searchText]);
 
///pagination
const indexOfLastItem=currentPage*itemsPerPage;
const indexOfFirstItem=indexOfLastItem-itemsPerPage;
const currentJobs=jobs.slice(indexOfFirstItem,indexOfLastItem);
 
/////next button and previous button
 
let nextPage=()=>{
  if(indexOfLastItem<jobs.length){
    setCurrentPage(currentPage+1);
  }
}
let prevPage=()=>{
  if(currentPage>1){
    setCurrentPage(currentPage-1);
  }
}

  const handleClick = ()=>{
    console.log(jobs)
      const filter=jobs.filter(job =>
      {
        if (job.jobTitle && typeof job.jobTitle === 'string') {
          // console.log(job)
          return job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      // Convert both jobTitle and searchText to lowercase for case-insensitive comparison
        //   return job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        }
        return false;
      })
      console.log(filter);
      setJobs(filter);
      setIsLoading(false);
  }

  // console.log(searchText);
 const handleDelete=(id)=>{
   console.log(id);
   fetch(`https://job-portal-server-api.vercel.app/job/${id}`,{
      method:"DELETE"
   }).then((res)=>res.json()).then((data)=>{
    if(data.acknowledged===true){
      handleSuccess('JOB Deleted successfully');
        setTimeout(() => {
            navigate('/my-job');
        }, 1000)
   }
   })
 }

  return (
    <div>
      <Profile loggedInUser={loggedInUser} handleLogout={handleLogout} />

      <div className="max-w-screen-2xl container mx-auto bg-gradient-to-br from-indigo-50 via-white to-purple-100 xl:px-24 px-4 py-10">
        <div className='my-jobs-container'>
          <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 my-6">List Of Jobs Posted By You</h1>

          <div className='search-box p-2 text-center mb-2'>
            <input
              onChange={(e) => setSearchText(e.target.value)}
              type='text'
              name='search'
              id='search'
              className='py-2 pl-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:w-6/12 mb-4 w-full rounded shadow-sm'
              placeholder="Search jobs by title..."
            />
            <button
              className='bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-2 rounded shadow-md transition duration-200'
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </div>

        {/*jobs table filtyered on basis of my email and the websearch*/}
        <section className="py-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-12">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b bg-indigo-50">
                <h3 className="font-bold text-lg text-indigo-700">All Jobs</h3>
                <Link
                  to="/post-job"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold uppercase px-4 py-2 rounded-full shadow-sm transition duration-200"
                >
                  Post a new Job
                </Link>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-indigo-100 text-indigo-700">
                    <tr>
                      <th className="px-6 py-3">No.</th>
                      <th className="px-6 py-3">Job Title</th>
                      <th className="px-6 py-3">Company Name</th>
                      <th className="px-6 py-3">Salary</th>
                      <th className="px-6 py-3">Edit</th>
                      <th className="px-6 py-3">Delete</th>
                    </tr>
                  </thead>

                  {
                    isLoading ? (
                      <tbody><tr><td colSpan="6" className="text-center py-10">Loading ....</td></tr></tbody>
                    ) : (
                      <tbody>
                        {
                          currentJobs.map((job, index) => (
                            <tr key={index} className="hover:bg-indigo-50 transition">
                              <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                              <td className="px-6 py-4">{job.jobTitle}</td>
                              <td className="px-6 py-4">{job.companyName}</td>
                              <td className="px-6 py-4">₹{job.minPrice}k - ₹{job.maxPrice}k</td>
                              <td className="px-6 py-4">
                                <Link
                                  to={`/edit-job/${job?._id}`}
                                  className="text-indigo-600 hover:underline font-medium"
                                >
                                  Edit
                                </Link>
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => handleDelete(job._id)}
                                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded shadow-sm transition duration-200"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    )
                  }
                </table>
              </div>
            </div>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center text-black space-x-8 mb-8">
            {
              currentPage > 1 && (
                <button className='hover:underline text-blue-700 font-semibold' onClick={prevPage}>Previous</button>
              )
            }
            {
              indexOfLastItem < jobs.length && (
                <button className='hover:underline text-blue-700 font-semibold' onClick={nextPage}>Next</button>
              )
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default MyJobs


