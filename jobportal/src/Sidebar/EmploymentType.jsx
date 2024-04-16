import React from 'react'
import InputField from '../Components/InputField'

const EmploymentType = ({handleChange}) => {
  return (
    <div>
    <h4 className='text-lg font-medium mb-2'>Employment Type</h4>
    <label className='sidebar-label-container'>
        <input  type="radio" name="test5" id="test5" value="" onChange={handleChange}/>
        <span className="checkmark"></span>Any
    </label>
    <InputField handleChange={handleChange}  value="Full-time" title="Full-time" name="test5"/>
    <InputField handleChange={handleChange}  value="Part-time" title="Part-time" name="test5"/>
    <InputField handleChange={handleChange}  value="Temporary" title="Temporary" name="test5"/>
    
</div>
  )
}

export default EmploymentType