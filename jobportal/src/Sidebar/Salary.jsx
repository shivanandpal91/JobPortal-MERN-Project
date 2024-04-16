import React from 'react'
import Button from './Button'
import InputField from '../Components/InputField'

const Salary = ({handleChange,handleClick}) => {
  return (
    <div>
        <h4 className="text-lg font-medium mb-2">Salary</h4>
        <div className='mb-4'>
            <Button handleClick={handleClick} value='Hourly' title='Hourly'/>
            <Button handleClick={handleClick} value='Monthly' title='Monthly'/>
            <Button handleClick={handleClick} value='Yearly' title='Yearly'/>
            <div>
            <label className='sidebar-label-container'>
              <input  type="radio" name="test2" id="test2" value="" onChange={handleChange}/>
              <span className="checkmark"></span>All
            </label>
            <InputField handleChange={handleChange}  value="30" title="< 30k" name="test2"/>
            <InputField handleChange={handleChange}  value="50" title="< 50k" name="test2"/>
            <InputField handleChange={handleChange}  value="80" title="< 80k" name="test2"/>
            <InputField handleChange={handleChange}  value="1000" title="< 100k" name="test2"/>
            
            
            
            
            </div>
          
        </div>
    </div>
  )
}

export default Salary