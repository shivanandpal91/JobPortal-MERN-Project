import React from 'react'
import Card from '../Components/Card'
const Jobs = ({result}) => {
  return (
    
    <>
      <div>
          <h1 className='text-lg font-bold mb-2' >{result.length} Jobs</h1>
      </div>
      <section>
          <div>{result}</div>
      </section>
    </>
  )
}

export default Jobs