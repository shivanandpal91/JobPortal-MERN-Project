// import React from 'react'
// import InputField from '../Components/InputField'
// const Location = ({handleChange}) => {
//   return (
//     <div>
//         <h4 className='text-lg font-medium mb-2'>Locations</h4>
//         <label className='sidebar-label-container'>
//             <input  type="radio" name="test" id="test" value="" onChange={handleChange}/>
//             <span className="checkmark"></span>All
//         </label>
//         <InputField handleChange={handleChange}  value="Banglore" title="Banglore" name="test"/>
//         <InputField handleChange={handleChange}  value="Hyderabad" title="Hyderabad" name="test"/>
//         <InputField handleChange={handleChange}  value="Mumbai" title="Mumbai" name="test"/>
//         <InputField handleChange={handleChange}  value="Gurgaon" title="Gurgaon" name="test"/>
        
//     </div>
//   )
// }

// export default Location

import React from 'react'
import InputField from '../Components/InputField'

const Location = ({ handleChange }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
      <h4 className="text-lg font-semibold text-indigo-700 mb-3">Location</h4>
      <label className="sidebar-label-container block mb-1">
        <input type="radio" name="test1" value="" onChange={handleChange} />
        <span className="checkmark" /> All
      </label>
      <InputField handleChange={handleChange} value="Banglore" title="Banglore" name="test1" />
      <InputField handleChange={handleChange} value="Hyderabad" title="Hyderabad" name="test1" />
      <InputField handleChange={handleChange} value="Mumbai" title="Mumbai" name="test1" />
      <InputField handleChange={handleChange} value="Gurgaon" title="Gurgaon" name="test1" />
    </div>
  )
}

export default Location
