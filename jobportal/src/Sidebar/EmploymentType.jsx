// import React from 'react'
// import InputField from '../Components/InputField'

// const EmploymentType = ({handleChange}) => {
//   return (
//     <div>
//     <h4 className='text-lg font-medium mb-2'>Employment Type</h4>
//     <label className='sidebar-label-container'>
//         <input  type="radio" name="test5" id="test5" value="" onChange={handleChange}/>
//         <span className="checkmark"></span>Any
//     </label>
//     <InputField handleChange={handleChange}  value="Full-time" title="Full-time" name="test5"/>
//     <InputField handleChange={handleChange}  value="Part-time" title="Part-time" name="test5"/>
//     <InputField handleChange={handleChange}  value="Temporary" title="Temporary" name="test5"/>
    
// </div>
//   )
// }

// export default EmploymentType

import React from 'react'
import InputField from '../Components/InputField'

const EmploymentType = ({ handleChange }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
      <h4 className="text-lg font-semibold text-indigo-700 mb-3">Employment Type</h4>
      <label className="sidebar-label-container block mb-1">
        <input type="radio" name="test5" value="" onChange={handleChange} />
        <span className="checkmark" /> Any
      </label>
      <InputField handleChange={handleChange} value="Full-time" title="Full-time" name="test5" />
      <InputField handleChange={handleChange} value="Part-time" title="Part-time" name="test5" />
      <InputField handleChange={handleChange} value="Temporary" title="Temporary" name="test5" />
    </div>
  )
}

export default EmploymentType
