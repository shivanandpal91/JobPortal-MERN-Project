// import React from 'react'
// import Button from './Button'
// import InputField from '../Components/InputField'

// const Salary = ({handleChange,handleClick}) => {
//   return (
//     <div>
//         <h4 className="text-lg font-medium mb-2">Salary</h4>
//         <div className='mb-4'>
//             <Button handleClick={handleClick} value='Hourly' title='Hourly'/>
//             <Button handleClick={handleClick} value='Monthly' title='Monthly'/>
//             <Button handleClick={handleClick} value='Yearly' title='Yearly'/>
//             <div>
//             <label className='sidebar-label-container'>
//               <input  type="radio" name="test2" id="test2" value="" onChange={handleChange}/>
//               <span className="checkmark"></span>All
//             </label>
//             <InputField handleChange={handleChange}  value="30" title="< 30k" name="test2"/>
//             <InputField handleChange={handleChange}  value="50" title="< 50k" name="test2"/>
//             <InputField handleChange={handleChange}  value="80" title="< 80k" name="test2"/>
//             <InputField handleChange={handleChange}  value="1000" title="< 100k" name="test2"/>
            
            
            
            
//             </div>
          
//         </div>
//     </div>
//   )
// }

// export default Salary


import React from 'react'
import Button from './Button'
import InputField from '../Components/InputField'

const Salary = ({ handleChange, handleClick ,selectedSalaryType}) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
      <h4 className="text-lg font-semibold text-indigo-700 mb-3">Salary</h4>

      <div className="flex flex-wrap gap-2 mb-4">
      <Button handleClick={handleClick} value="" title="All" selected={selectedSalaryType} />
        <Button handleClick={handleClick} value="Hourly" title="Hourly" selected={selectedSalaryType}/>
        <Button handleClick={handleClick} value="Monthly" title="Monthly" selected={selectedSalaryType}/>
        <Button handleClick={handleClick} value="Yearly" title="Yearly" selected={selectedSalaryType}/>
      </div>

      <div>
        <label className="sidebar-label-container block mb-1">
          <input type="radio" name="test2" value="" onChange={handleChange} />
          <span className="checkmark" /> All
        </label>
        <InputField handleChange={handleChange} value="30" title="&lt; 30k" name="test2" />
        <InputField handleChange={handleChange} value="50" title="&lt; 50k" name="test2" />
        <InputField handleChange={handleChange} value="80" title="&lt; 80k" name="test2" />
        <InputField handleChange={handleChange} value="1000" title="&lt; 100k" name="test2" />
      </div>
    </div>
  )
}

export default Salary
