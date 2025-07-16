import React,{useState,useEffect} from 'react'
import {useParams,useLoaderData} from "react-router-dom"
import { useForm } from "react-hook-form"
import CreatableSelect from 'react-select/creatable';

import { useNavigate } from 'react-router-dom';
import Profile from '../Components/Profile';
import { handleError,handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const UpdateJob = () => {

    const [loggedInUser, setLoggedInUser] = useState('');
        const [products, setProducts] = useState('');
        const navigate = useNavigate();
          useEffect(() => {
              setLoggedInUser(localStorage.getItem('loggedInUser'))
          }, [])
      
          const handleLogout = (e) => {
              localStorage.removeItem('token');
              localStorage.removeItem('loggedInUser');
              handleSuccess('User Loggedout');
              setTimeout(() => {
                  navigate('/login');
              }, 1000)
          }
    const {id}=useParams();
    // console.log(id)
    const {_id,jobTitle,companyName,minPrice,maxPrice,salaryType,jobLocation,postingDate,experienceLevel,
        companyLogo,employmentType,description,postedBy,skills,createdAt}=useLoaderData();

        const[selectedOption,setSelectedOption]=useState(null);
        const {
            register,
            handleSubmit,reset,
            formState: { errors },
          } = useForm()
        
          const onSubmit = async (data) => {
            data.skills=selectedOption;
            console.log(data)
            const response=await fetch(`http://localhost:8080/update-job/${_id}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            }).then(res=>res.json()).then((result)=>{
                 console.log(result)
                 if(result.acknowledged===true){
                    handleSuccess('JOB updated successfully');
                    setTimeout(() => {
                        navigate('/my-job');
                    }, 1000)
                 }
                 reset();
            })
            console.log(response);
        };
       
        const options=[
            {value:"Javascript",label:"Jvascript"},
            {value:"Node",label:"Node"},
            {value:"React",label:"React"},
            {value:"Redux",label:"Redux"},
            {value:"Html",label:"Html"},
            {value:"Tailwind Css",label:"Tailwind Css"},
            {value:"CSS",label:"CSS"},
            {value:"MongoDB",label:"MongoDB"},
            {value:"ExpressJS",label:"ExpressJS"},
            {value:"NextJS",label:"NextJS"},
            {value:"ExpressJS",label:"ExpressJS"}
    
        ]


  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <Profile loggedInUser={loggedInUser} handleLogout={handleLogout} />
      
      <div className='bg-gradient-to-br from-indigo-50 via-white to-purple-100 py-10 px-4 lg:px-16 shadow-xl rounded-xl'>
        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/*first row */}
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-base font-semibold text-indigo-700'>Job Title</label>
              <input type='text' defaultValue={jobTitle} {...register("jobTitle")} className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-base font-semibold text-indigo-700'>Company Name</label>
              <input type='text' defaultValue={companyName} placeholder="Ex: Microsoft" {...register("companyName")} className='create-job-input' />
            </div>
          </div>

          {/*second row */}
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-base font-semibold text-indigo-700'>Minimum Salary</label>
              <input type='text' defaultValue={minPrice} placeholder='20k' {...register("minPrice")} className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-base font-semibold text-indigo-700'>Maximum Salary</label>
              <input type='text' defaultValue={maxPrice} placeholder='120k' {...register("maxPrice")} className='create-job-input' />
            </div>
          </div>

          {/*3rd row */}
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-base font-semibold text-indigo-700'>Salary Type</label>
              <select {...register("salaryType")} className='create-job-input'>
                <option value={salaryType}>{salaryType}</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-base font-semibold text-indigo-700'>Job Location</label>
              <input type='text' defaultValue={jobLocation} placeholder='Ex: London' {...register("jobLocation")} className='create-job-input' />
            </div>
          </div>

          {/*4th row */}
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-base font-semibold text-indigo-700'>Posting Date</label>
              <input type='date' defaultValue={postingDate} {...register("postingDate")} className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-base font-semibold text-indigo-700'>Experience Level</label>
              <select {...register("experienceLevel")} className='create-job-input'>
                <option value={experienceLevel}>{experienceLevel}</option>
                <option value="No Experience">No Experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>

          {/*5th row */}
          <div>
            <label className='block mb-2 text-base font-semibold text-indigo-700'>Required Skills</label>
            <CreatableSelect
              defaultValue={skills}
              onChange={setSelectedOption}
              isMulti
              options={options}
              className='rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500'
            />
          </div>

          {/*6th row */}
          <div className='create-job-flex'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-base font-semibold text-indigo-700'>Company Logo</label>
              <input type='url' defaultValue={companyLogo} placeholder='paste your company logo url...' {...register("companyLogo")} className='create-job-input' />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-base font-semibold text-indigo-700'>Employment Type</label>
              <select {...register("employmentType")} className='create-job-input'>
                <option value={employmentType}>{employmentType}</option>
                <option value="Temporary">Temporary</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
          </div>

          {/*7th row */}
          <div className='w-full'>
            <label className='block mb-2 text-base font-semibold text-indigo-700'>Job Description</label>
            <textarea
              className='w-full pl-3 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
              rows={6}
              defaultValue={description}
              placeholder="Job description"
              {...register("description")}
            />
          </div>

          {/*last row */}
          <div>
            <label className='block mb-2 text-base font-semibold text-indigo-700'>Job Posted By</label>
            <input type='email' defaultValue={postedBy} placeholder='your email: abcxyz123@gmail.com' {...register("postedBy")} className='create-job-input' />
          </div>

          <input
            type="submit"
            className='block mt-10 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-3 rounded-md shadow-lg cursor-pointer transition duration-300'
            value="Update Job"
          />
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UpdateJob
