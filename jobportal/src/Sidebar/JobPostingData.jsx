import React from 'react'
import InputField from '../Components/InputField';

// const JobPostingData = ({handleChange}) => {
//   const now =new Date();
//   const twentyFourHourAgo= new Date(now-24*60*60*1000 );
//    const sevenDaysAgo= new Date(now-7*24*60*60*1000 );
//    const thirtyDaysAgo= new Date(now-30*24*60*60*1000 );
   
//    //convert date to string
//    const twentyFourHourAgostring=twentyFourHourAgo.toISOString().slice(0,10);
//    const sevenDaysAgoString=sevenDaysAgo.toISOString().slice(0,10);
//    const thirtyDaysAgoString=thirtyDaysAgo.toISOString().slice(0,10);
//   return (
//     <div>
//         <h4 className='text-lg font-medium mb-2'>Date Of Posting</h4>
//         <label className='sidebar-label-container'>
//             <input  type="radio" name="test3" id="test3" value="" onChange={handleChange}/>
//             <span className="checkmark"></span>All Time
//         </label>
//         <InputField handleChange={handleChange}  value={twentyFourHourAgostring} title="Lat 24 Hours" name="test3"/>
//         <InputField handleChange={handleChange}  value={sevenDaysAgoString} title="Last 7 Days" name="test3"/>
//         <InputField handleChange={handleChange}  value={thirtyDaysAgoString} title="Last Month" name="test3"/>
       
        
//     </div>
//   )
// }

// export default JobPostingData


const JobPostingData = ({ handleChange }) => {
  const now = new Date();
  const twentyFourHourAgostring = new Date(now - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const sevenDaysAgoString = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const thirtyDaysAgoString = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm border">
      <h4 className="text-lg font-semibold text-indigo-700 mb-3">Date of Posting</h4>
      <label className="sidebar-label-container block mb-1">
        <input type="radio" name="test3" value="" onChange={handleChange} />
        <span className="checkmark" /> All Time
      </label>
      <InputField handleChange={handleChange} value={twentyFourHourAgostring} title="Last 24 Hours" name="test3" />
      <InputField handleChange={handleChange} value={sevenDaysAgoString} title="Last 7 Days" name="test3" />
      <InputField handleChange={handleChange} value={thirtyDaysAgoString} title="Last Month" name="test3" />
    </div>
  )
}

export default JobPostingData
