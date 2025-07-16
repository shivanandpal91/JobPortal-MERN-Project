// import {React,useState,useEffect} from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { FaBarsStaggered ,FaXmark} from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils';
// import { ToastContainer } from 'react-toastify';

// const Navbar = () => {

    

//     const[isMenuOpen,setIsMenuOpen]=useState(false)

//     const handleMenuToggler=()=>{
//         setIsMenuOpen(!isMenuOpen)
//     }

//     const navItems=[
//         {path:"/",title:"Home"},
//         {path:"/my-job",title:"My job"},
//         {path:"/salary",title:"Salary Estimate"},
//         {path:"/post-job",title:"Post YourJob"}
//     ]
//   return (
//     <header className="max-w-screen-2xl container mx-auto xl:px-4 px-4">
//         <nav className="flex justify-between items-center">
//         <a href="/" className="flex items-center gap-2 text-xl text-slate-950 ">
//             <img src="/public/images/Linear.png" className="min-w-5" />
//             <span>JobPortal</span>
//         </a>
//             <ul className="hidden  md:flex gap-5 ">
//                 {navItems.map(({path,title}) => (
                
//                         <li key={path}>
//                             <NavLink to={path} className={({isActive })=> isActive?"active":""}>
//                             {title}
//                             </NavLink>
//                         </li>
               
//                 ))}
//             </ul>
            
//             {/* for mobile view */}
//             <div className=" md:hidden block">
//                 <button onClick={handleMenuToggler}>
//                     {
//                         isMenuOpen ? <FaXmark className="w-6 h-5" /> :<FaBarsStaggered className="w-6 h-5" />
//                     }
                    
//                 </button>
           
//             </div>
//         </nav>
        
//         {/* nav items for mobile */}
//         <div className={` ml-24 p-5 bg-black py-5 rounded-xl ${isMenuOpen?"":"hidden"}`}>
//             <ul>
//                 {navItems.map(({path,title}) => (
                
//                     <li key={path} >
                       
//                        <NavLink to={path} className={({isActive })=> isActive?"active":""}>
//                         {title}
//                         </NavLink>
                    
                        
//                     </li>
       
//                 ))}
//             </ul>
//         </div>
//     </header>
//   )
// }

// export default Navbar
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { path: "/", title: "Home" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post a Job" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-2xl container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 text-2xl font-bold text-indigo-700">
          <img src="/images/Linear.png" alt="Logo" className="w-12 h-12 object-contain" />
          <span>JobPortal</span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          {navItems.map(({ path, title }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-700 font-semibold border-b-2 border-indigo-700 pb-1"
                    : "hover:text-indigo-600 transition"
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <FaXmark className="w-6 h-6 text-indigo-700" /> : <FaBarsStaggered className="w-6 h-6 text-indigo-700" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-6 py-4 shadow-lg rounded-b-xl transition-all">
          <ul className="space-y-4 text-gray-700 font-medium">
            {navItems.map(({ path, title }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-700 font-semibold"
                      : "hover:text-indigo-600 transition"
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
