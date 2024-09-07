import React from 'react'

const SalaryPageHeader = ({title,path}) => {
  return (
    <div className='py-2 mt-3 bg-lime-100 rounded flex items-center justify-center'>
        <div>
             <h2 className="text-3xl text-blue-900 font-medium mb-1 text-center"> {title}</h2>
             <p className='text-sm text-center'><a href="/" className='hover:underline'>Home</a>/{path}</p> 
        </div>
    </div>
  )
}

export default SalaryPageHeader