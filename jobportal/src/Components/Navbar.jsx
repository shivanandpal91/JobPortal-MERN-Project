import {React,useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBarsStaggered ,FaXmark} from "react-icons/fa6";

const Navbar = () => {
    const[isMenuOpen,setIsMenuOpen]=useState(false)

    const handleMenuToggler=()=>{
        setIsMenuOpen(!isMenuOpen)
    }

    const navItems=[
        {path:"/",title:"Start a Search"},
        {path:"/my-job",title:"My job"},
        {path:"/salary",title:"Salary Estimate"},
        {path:"/post-job",title:"Post YourJob"}
    ]
  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-4 px-4">
        <nav className="flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 text-xl text-slate-950 ">
            <img src="/public/images/Linear.png" className="min-w-5" />
            <span>JobPortal</span>
        </a>
            <ul className="hidden  md:flex gap-5 ">
                {navItems.map(({path,title}) => (
                
                        <li key={path}>
                            <NavLink to={path} className={({isActive })=> isActive?"active":""}>
                            {title}
                            </NavLink>
                        </li>
               
                ))}
            </ul>
            <div className= " gap-2 m-5 hidden lg:block">
                <Link to="/login" className="py-2 px-5 rounded-sm m-5 bg-blue-500 text-white" >Log In </Link>
                {/* <Link to="/sign-up" className="py-2 px-5 m-5 rounded-sm bg-blue-500 text-white" >Sign Up </Link> */}
            </div>
            {/* for mobile view */}
            <div className=" md:hidden block">
                <button onClick={handleMenuToggler}>
                    {
                        isMenuOpen ? <FaXmark className="w-6 h-5" /> :<FaBarsStaggered className="w-6 h-5" />
                    }
                    
                </button>
           
            </div>
        </nav>
        
        {/* nav items for mobile */}
        <div className={` ml-24 p-5 bg-black py-5 rounded-xl ${isMenuOpen?"":"hidden"}`}>
            <ul>
                {navItems.map(({path,title}) => (
                
                    <li key={path} >
                       
                       <NavLink to={path} className={({isActive })=> isActive?"active":""}>
                        {title}
                        </NavLink>
                    
                        
                    </li>
       
                ))}
            </ul>
        </div>
    </header>
  )
}

export default Navbar