import React,{useState,useEffect} from 'react'
import SalaryPageHeader from '../Components/SalaryPageHeader'

const SalaryPage = () => {
       const [searchText,setSearchText]=useState("");
       const [salary,setSalary] = useState([]);

       useEffect(() => {
        fetch("salary.json").then(res=>res.json()).then(data=>{
            setSalary(data);
        })
       },[searchText])

       const handleSearch=()=>{
        // console.log(salary)
          const filter=salary.filter(job =>
          {
            if (job.title && typeof job.title === 'string') {
            //   console.log(job)
              return job.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
            //   // Convert both jobTitle and searchText to lowercase for case-insensitive comparison
            //   return job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            }
            return false;
          })

          console.log(filter);
          setSalary(filter);
        //   setIsLoading(false);
      }
       console.log(searchText)
  return (
    <div className="max-w-wscreen-2xl bg-slate-200 container mx-auto xl:px-24 px-4">
      <SalaryPageHeader title={"Explore the potential compensation for your desired role."} path={"Salary"}/>
      <div className='mt-5'>
        <div className='search-box py-2 text-center mb-2'>
              <input type="text" name='search' id='search' className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full' onChange={e=>setSearchText(e.target.value)} />
              <button onClick={handleSearch} className='bg-blue-700 text-white font-semibold px-8 py-2 rounded-sm mb-4'> Search</button>
        </div>

      </div>
      {/*Salary display card */}
      <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center'>
        {
            salary.map((data)=>(
            
                <div key={data.id} className='shadow px-4 py-4'>
                   <h4 className='font-semibold text--xl '>{data.title}</h4>
                   <p className='my-2 font-medium text-blue-500 text-lg'>{data.salary}</p>
                   <div className=' flex flex-wrap gap-4'>
                    <a href='/' className='underline'>{data.status}</a>
                    <a href='/' className='underline'>{data.skills}</a>
                   </div>
                </div>

            ))
        }
      </div>
    </div>
  )
}

export default SalaryPage