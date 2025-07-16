import React ,{useState,useEffect}from 'react'
import { useForm } from "react-hook-form"
import CreatableSelect from 'react-select/creatable';
import { useNavigate } from 'react-router-dom';
import Profile from '../Components/Profile';
import { handleError,handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const CreateJob = () => {
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
    const[selectedOption,setSelectedOption]=useState(null);
    const {
        register,
        handleSubmit,reset,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async (data) => {
        data.skills=selectedOption;
        console.log(data)
        const response=await fetch("https://job-portal-server-api.vercel.app/post-job",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then(res=>res.json()).then((result)=>{
             console.log(result)
             if(result.acknowledged===true){
                handleSuccess('Job Posted Successfully');
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
    <div>
      <Profile loggedInUser={loggedInUser} handleLogout={handleLogout} />
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 my-6">Post Your Own Job</h1>

        <div className='bg-gradient-to-br from-indigo-100 via-white to-purple-100 shadow-xl rounded-xl py-10 px-4 lg:px-16'>
          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>

            {/* first row */}
            <div className='create-job-flex gap-6'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-md font-medium'>Job Title</label>
                <input type='text' defaultValue={"Web Developer"} {...register("jobTitle")} className='create-job-input' />
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-md font-medium'>Company Name</label>
                <input type='text' placeholder="Ex: Microsoft" {...register("companyName")} className='create-job-input' />
              </div>
            </div>

            {/* second row */}
            <div className='create-job-flex gap-6'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-md font-medium'>Minimum Salary</label>
                <input type='text' placeholder='20k' {...register("minPrice")} className='create-job-input' />
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-md font-medium'>Maximum Salary</label>
                <input type='text' placeholder="120k" {...register("maxPrice")} className='create-job-input' />
              </div>
            </div>

            {/* third row */}
            <div className='create-job-flex gap-6'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-md font-medium'>Salary Type</label>
                <select {...register("salaryType")} className='create-job-input'>
                  <option value="">Choose Salary Type</option>
                  <option value="Hourly">Hourly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-md font-medium'>Job Location</label>
                <input type='text' placeholder="Ex: London" {...register("jobLocation")} className='create-job-input' />
              </div>
            </div>

            {/* fourth row */}
            <div className='create-job-flex gap-6'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-md font-medium'>Posting Date</label>
                <input type='date' {...register("postingDate")} className='create-job-input' />
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-md font-medium'>Experience Level</label>
                <select {...register("experienceLevel")} className='create-job-input'>
                  <option value="">Choose Experience Level</option>
                  <option value="No Experience">No Experience</option>
                  <option value="Internship">Internship</option>
                  <option value="Work remotely">Work remotely</option>
                </select>
              </div>
            </div>

            {/* fifth row */}
            <div>
              <label className='block mb-2 text-md font-medium'>Required Skills</label>
              <CreatableSelect
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                isMulti
                options={options}
                className='rounded border shadow-sm'
              />
            </div>

            {/* sixth row */}
            <div className='create-job-flex gap-6'>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-md font-medium'>Company Logo</label>
                <input type='url' placeholder='Paste your logo URL' {...register("companyLogo")} className='create-job-input' />
              </div>
              <div className='lg:w-1/2 w-full'>
                <label className='block mb-2 text-md font-medium'>Employment Type</label>
                <select {...register("employmentType")} className='create-job-input'>
                  <option value="">Choose Employment Type</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>
            </div>

            {/* seventh row */}
            <div>
              <label className='block mb-2 text-md font-medium'>Job Description</label>
              <textarea
                rows={6}
                defaultValue={"demo text"}
                placeholder="Job description"
                {...register("description")}
                className='w-full border p-3 rounded shadow-sm focus:outline-none placeholder:text-gray-700'
              />
            </div>

            {/* last row */}
            <div>
              <label className='block mb-2 text-md font-medium'>Job Posted By</label>
              <input type='email' placeholder='Your email: abcxyz123@gmail.com' {...register("postedBy")} className='create-job-input' />
            </div>

            <input type="submit" value="Submit Job" className='mt-8 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded shadow-md cursor-pointer transition duration-200' />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateJob;
