import React, { useState } from 'react'
import {Link, Navigate, useNavigate} from "react-router-dom"
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useAuth } from '../Context/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';

function Navbar() {

  const navigateTo = useNavigate();
  const [show,setShow] = useState(false);
  const { isAuthenticated  ,setIsAuthenticated} = useAuth();
  const handleProfile = ()=>{
    // isAuthenticated ?  navigateTo="/dashboard": navigateTo="/login"
    if(!isAuthenticated){
      toast.error("Please login for Profile")
      navigateTo('/login')
    }
    else{
      navigateTo('/dashboard')
    }
  }

  const handleLogout = (e) => {
    e.preventDefault();

    axios.get("/api/v1/users/logout", { withCredentials: true })
      .then((response) => {
          toast.success("User logged out successfully");

          Cookies.remove("token");  //  Remove token after logout
          setIsAuthenticated(false);  // Update authentication state
          navigateTo("/");  // ✅ Redirect user
      })
      .catch((error) => {
          if (error.response) {
              toast.error(error?.response?.data?.msg || " failed to logout ");
          }
      });
  };



  return (
    <>
      <nav className='shadow-lg px-3 py-3 mx-3 max-sm:px-1'>
        <div className='flex items-center justify-between container mx-auto'>
          <Link to='/' >
            <div className='font-semibold text-xl hover:scale-110 hover:shadow-lg duration-300 shadow-gray-500' >
              Blog <span className='text-blue-500'>Negus</span>
            </div>
          </Link>

          {/* desktop */}
          <div className=''>
            <ul className=' space-x-6 hidden  md:flex'>
              
              <Link to="/blogs " className='hover:text-blue-500  hover:font-semibold duration-300 hover:shadow-sm'>  BLOGS</Link>
               
              <Link to="/about" className='hover:text-blue-500  hover:font-semibold duration-300 hover:shadow-sm'>ABOUT</Link>
              <Link to="/contact" className='hover:text-blue-500  hover:font-semibold duration-300 hover:shadow-sm'>CONTACT</Link>
              
            </ul>
            <div className=' md:hidden ' onClick={()=>setShow(!show)}>{show ? <IoMdClose size={24} /> :<AiOutlineMenu size={24} className='max-sm:float-end'/> }

            </div>
          </div>
          
          <div className='space-x-2  flex'>
           {/* <Link onClick={handleDashboard} className='bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded-md ' >DASHBOARD</Link> */}
            <button
              onClick={handleProfile}
              className="bg-blue-600 text-white md:font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded-md "
            >
              Profile
            </button>
              
            
            {/* <Link to="/Login"  className={` ${isAuthenticated ? "bg-blue-800" :"bg-red-600", "text-white" ,"font-semibold" ,"hover:bg-red-800" ,"duration-300" ,"px-4" ,"py-2" ,"rounded-md" } `}>LOGIN</Link> */}
            {/* <Link to="/Login"  className='bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded-md'>LOGIN</Link> */}


            {
              !isAuthenticated ? (<Link to="/login"  className='bg-red-600 text-white md:font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded-md '>LOGIN</Link> ):(
                <Link onClick={handleLogout}  className='bg-red-300 text-white md:font-semibold hover:bg-red-500 duration-300 px-4 py-2 rounded-md  '>LOGOUT</Link> 
              )
            }

            
          </div>
        </div>

        {/* mobile navbar */}
        {
          show && (
            <div className=' '>
              <ul className='flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl rounded-md bg-gray-200'>
               
                <Link to="/blogs "onClick={()=>(setShow(!show))}   className='hover:text-blue-500  hover:font-semibold duration-300 hover:shadow-sm'>  BLOGS</Link>
                <Link to="/about"onClick={()=>(setShow(!show))}    className='hover:text-blue-500 duration-300  hover:shadow-sm'>ABOUT</Link>
                <Link to="/contact"onClick={()=>(setShow(!show))}    className='hover:text-blue-500 duration-300  hover:shadow-sm'>CONTACT</Link>
                <Link to="/register"onClick={()=>(setShow(!show))}    className='hover:text-blue-500 duration-300  hover:shadow-sm '>REGISTER</Link>
                <Link to="/dashboard"onClick={()=>(setShow(!show))}    className='hover:text-blue-500 duration-300  hover:shadow-sm '>DASHBOARD</Link>
                
              </ul>
            </div>
          )
        }

      </nav>
    </>
  )
}

export default Navbar