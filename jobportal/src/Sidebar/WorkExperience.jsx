
import React from 'react'
import InputField from '../Components/InputField'

const WorkExperience = ({ handleChange }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
      <h4 className="text-lg font-semibold text-indigo-700 mb-3">Work Experience</h4>
      <label className="sidebar-label-container block mb-1">
        <input type="radio" name="test4" value="" onChange={handleChange} />
        <span className="checkmark" /> Any experience
      </label>
      <InputField handleChange={handleChange} value="Internship" title="Internship" name="test4" />
      <InputField handleChange={handleChange} value="Work remotely" title="Work remotely" name="test4" />
    </div>
  )
}

export default WorkExperience
