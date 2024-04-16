import React, { useEffect } from 'react'
import Banner from '../Components/Banner.jsx'
import { useState } from 'react'
import Jobs from './Jobs'
import Card from '../Components/Card.jsx'
import SideBar from '../Sidebar/SideBar.jsx'
import NewsLetter from '../Components/NewsLetter.jsx'



const Home = () => {

  {/* now create state for filters */}

  //for lest side bar to filter based on radio button
  const [selectedCategory,setSelectedCategory]=useState(null);

  //for job filtering
  const [jobs,setJobs]=useState([]);

  {/*for loading....*/}
 const[isLoading,setIsLoading] = useState(true)
 {/* for pagination (one page can have 6 data)*/}
 const[currentPage,setCurrentPage]=useState(1);
 const itemsPerPage=6;

  useEffect(()=>{
    setIsLoading(true)
     fetch("jobs.json").then(res=>res.json()).then(data=>{
          setJobs(data)
          setIsLoading(false)
     })
  },[])

  // console.log(jobs)

   {/* for banners  creating usestate hook and passing everything in banner*/}
  const[query,setQuery]=useState("");
  const handleInputChanger=(event)=>{
      setQuery(event.target.value);
      console.log(event.target.value);
  }

  //filtered jobs
  const filteredItems=jobs.filter(job =>job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  // console.log(filteredItems)

////----radio filter-----

const handleChange=(event)=>{
     setSelectedCategory(event.target.value)
}
//-------button based filtering-----
const handleClick=(event)=>{
  setSelectedCategory(event.target.value)
}



/// calculate the index range for PAGINATION

//---------------------------------------------------------------
const calculatePageRange=() =>{
  const startIndex=(currentPage-1) * itemsPerPage;
  const endIndex= startIndex + itemsPerPage;
  return {startIndex,endIndex}
}
const nextPage=() =>{
  if(currentPage<Math.ceil(filteredItems.length/itemsPerPage)){
    setCurrentPage(currentPage+1)
  }
}

const prevPage=() =>{
  if(currentPage>1){
    setCurrentPage(currentPage-1)
  }
}
//---------------------------------------------------------------------



// main functions for filtering-------------------------------------------------
const filteredData=(jobs,selected,query)=>{
     let filteredJobs=jobs;

     // filtering input items
     if(query){
      filteredJobs=filteredItems;
     }
  //  console.log(filteredJobs)
    console.log(selected)
    if(selected){
      filteredJobs = filteredJobs.filter(({jobLocation,maxPrice,experienceLevel,salaryType,
        employmentType,postingDate})=>{
          console.log(postingDate,selected);
          // const selectedDate = new Date(selected);
          // const jobDate = new Date(postingDate);
          return(
          // jobDate >= selectedDate ||
          postingDate >= selected ||
           jobLocation.toLowerCase()===selected.toLowerCase() ||
          parseInt(maxPrice)<=parseInt(selected) ||
          experienceLevel.toLowerCase()===selected.toLowerCase() ||
          salaryType.toLowerCase()===selected.toLowerCase() ||
          employmentType.toLowerCase()===selected.toLowerCase()
        )
          console.log(filteredJobs);
      });
      
     } 
     //slice the data bassed oncurrent page
     const {startIndex,endIndex}=calculatePageRange();
     filteredJobs = filteredJobs.slice(startIndex,endIndex);
     return filteredJobs.map((data,i)=><Card key={i} data={data}/>)
}
const result=filteredData(jobs,selectedCategory,query)


// const f=filteredData(jobs,"2024-04-15",query)
// console.log(f)
 console.log(result)

//----------------------------------------------------------------------------------------------------------------


  return (
    <div>
      <Banner query={query} handleInputChanger={handleInputChanger}/>
      {/*main contents*/ }
      <div className="bg-yellow-300 md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded"><SideBar  handleChange={handleChange} handleClick={handleClick}/></div>
        <div className="col-span-2 bg-white p-4 rounded">
           {
                isLoading?(<p className='text-black font-bold '>Loading....</p>):result.length>0?<Jobs result={result}/>:
                <>
                  <h1 className='text-lg font-bold mb-2' >{result.length} Jobs</h1>
                  <p>No Data Found</p>
                </>
            }

            {/*pagination*/}
            {
              result.length >= 0 ?(
                <div className='flex  justify-center mt-5  space-x-8'>
                  <button onClick={prevPage} disabled={currentPage===1} className="hover:underline">Previous</button>
                  <span>... Page {currentPage} of {Math.ceil(filteredItems.length/itemsPerPage)} ... </span>
                  <button onClick={nextPage} disabled={currentPage===Math.ceil(filteredItems.length/itemsPerPage)} className="hover:underline">Next</button>
                </div>
              ):""
                
              
            }
        </div>
        <div className="bg-white p-4 rounded"><NewsLetter/></div>
      </div>
      
    </div>
  )
}

export default Home