import React ,{useState}from 'react'
import { useForm } from "react-hook-form"
import CreatableSelect from 'react-select/creatable';

const CreateJob = () => {
    const[selectedOption,setSelectedOption]=useState(null);
    const {
        register,
        handleSubmit,reset,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async (data) => {
        data.skills=selectedOption;
        console.log(data)
        const response=await fetch("http://localhost:3000/post-job",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then(res=>res.json()).then((result)=>{
             console.log(result)
             if(result.acknowledged===true){
                alert("JOB posted successfully")
                
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
    <div className="mac-w-screen-2xl container mx-auto xl:px-24 px-4">
        <div className='bg-slate-300 py-10 px-4 lg:px-16'>
        {/* form*/ }
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            {/*first row */}
            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Job Title</label>
                    <input type='text' defaultValue={"Web Developer"} {...register("JobTitle")} className='create-job-input'></input>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Company Name</label>
                    <input type='text' placeholder="Ex: Microsoft" {...register("companyName")} className='create-job-input'></input>
                </div>
            </div>

            {/*second row */}
            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Minimum Salary</label>
                    <input type='text' placeholder=' 20k' {...register("minPrice")} className='create-job-input'></input>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Maximum Salary </label>
                    <input type='text' placeholder="120k" {...register("maxPrice")} className='create-job-input'></input>
                </div>
            </div>

            {/*3rd row */}
            
            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Salary Type</label>
                    <select name="test" {...register("salaryType")}  className='create-job-input'>
                        <option value="">Choose Your Salary</option>
                        <option value="Hourly">Hourly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Job Location</label>
                    <input type='text' placeholder="Ex: London" {...register("jobLocation")} className='create-job-input'></input>
                </div>
            </div>
            
            {/*4th row */}

            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Posting Date</label>
                    <input type='date' placeholder='ex: 2024-04-17' {...register("postingDate")} className='create-job-input'></input>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Experience Level</label>
                    <select name="test" {...register("experienceLevel")}  className='create-job-input'>
                        
                        <option value=""> Choose Your Experience</option>
                        <option value="No Experience">No Experience</option>
                        <option value="Internship">Internship</option>
                        <option value="Work remotely">Work remotely</option>
                        
                    </select>
                </div>
            </div>

            {/*5th row */}
            <div>
            <label className='block mb-2 text-lg'> Required Skills</label>
                <CreatableSelect  defaultValue={selectedOption} onChange={setSelectedOption} isMulti options={options} className='create-job-input'/>
            </div>

            
            {/*6th row */}
            <div className='create-job-flex'>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Company Logo</label>
                    <input type='url' placeholder='paste your company logo url: https://image.com/img1/ ' {...register("companyLogo")} className='create-job-input'></input>
                </div>
                <div className='lg:w-1/2 w-full'>
                    <label className='block mb-2 text-lg'>Employment Type</label>
                    <select name="test" {...register("employmentType")}  className='create-job-input'>
                        
                        <option value="">Choose Employment type</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        
                    </select>
                </div>
            </div>

            {/* 7th row*/ }
            <div className='w-full'>
                <label className='block mb-2 text-lg'>Job Description</label>
                <textarea  className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700'
                row={6}
                defaultValue={"demo text"}
                placeholder="Job description"
                {...register("description")} />

            </div>

            {/*last row*/ }
            <div>
                <label className='block mb-2 text-lg'>Job Posted By</label>
                <input type='email' placeholder=' your email:abcxyz123@gmail.com ' {...register("postedBy")} className='create-job-input'></input>
            </div>

            <input type="submit" className='block mt-12 bg-blue-700 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer'/>
            </form>
        </div>
    </div>
  )
}

export default CreateJob