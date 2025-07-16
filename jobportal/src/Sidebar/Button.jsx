// import React from 'react'

// const Button = ({handleClick,value,title}) => {
//   return (
//     <button onClick={handleClick} value={value} className='px-4 py-1 border text-base 
//     hover:bg-blue-500 hover:text-white'>{title}</button>
//   )
// }

// export default Button

import React from 'react';

const Button = ({ handleClick, value, title, selected }) => {
  const isSelected = selected === value;

  return (
    <button
      onClick={handleClick}
      value={value}
      className={`px-4 py-1 border text-base rounded transition 
        ${isSelected ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-blue-100'}`}
    >
      {title}
    </button>
  );
};

export default Button;
