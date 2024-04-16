import { useState } from 'react'
import React from 'react'
import {FiMapPin, FiSearch} from 'react-icons/fi'


const Banner = (props) => {

  


  return (
  
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14">
          <h1 className='text-5xl font-bold text-primary mb-3'>Find Your <span className="text-blue-400">new</span> Job now </h1>
          <p className="mb-8 text-black ">Explore jobs in IT sector in Latest Technology</p>

          <form>
            < div className="flex justify-start md: flex-row md:gap-0 gap-4 ">
              <div className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-insetring-gray-300 focus-within:ring-2 focus-within-ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full">
                  <input type="text" name="title" id="title" placeholder='What Job Role you are looking for?' className='block flex-1 border-0  ml-8 bg-transparent 
                  py-1.5 p1-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6' onChange={props.handleInputChanger} value={props.query}/> 
                  <FiSearch className='absolute mt-2.5 ml-2 text-gray-400'/>
              </div>
              <div className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-insetring-gray-300 focus-within:ring-2 focus-within-ring-inset focus:within:ring-indigo-600 md:w-1/2 w-full">
                  <input type="text" name="title" id="title" placeholder='Location' className='block flex-1 border-0  ml-8 bg-transparent 
                  py-1.5 p1-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6' /> 
                  <FiMapPin className='absolute mt-2.5 ml-2 text-gray-400'/>
              </div>
              <button type="submit" className="flex justify-center  items-center px-2 text-white bg-cyan-900 rounded md:rounded-s-none">Search</button>
            </div>
          </form>
    </div>
    
  )
}

export default Banner