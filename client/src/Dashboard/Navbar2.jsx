import React, { useState } from 'react'
import { useAuth } from '../Context/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { IoIosMenu } from "react-icons/io";
import { BiLeftArrowAlt } from "react-icons/bi";


function Navbar2({setComponent}) {
    const { profile , isAuthenticated , setIsAuthenticated} = useAuth()
    const [show ,setShow] = useState(false)
    // console.log("from navbar2 = ",profile?.user)
    const navigateTo = useNavigate()
    

    const handleComponenet = (value)=>{
      console.log("value for create blog")
      setComponent(value)
    }
    const gotoHome = ()=>{
      navigateTo('/')
    }

    const handleLogout =async (e)=>{
      e.preventDefault();
      try {
        if(isAuthenticated){
          const {data} = axios.get('/api/v1/users/logout' , {withCredentials:true})
          toast.success("User log out Successfully")
          // alert("User loged successfully")
          setIsAuthenticated(false)
          navigateTo('/')
        }
        else{
          toast.error("please login")
          navigateTo('/login')
        }
        
      } catch (error) {
        
        console.log(error.message)
        toast.error("Faild to logout")
        alert("failed to logout")
      }
    }
    


  return (
    <>
      <div onClick={()=>setShow(!show)} className='sm:hidden fixed top-4 left-4 z-10'>
        <  IoIosMenu  className='text-2xl'/>
      </div>

      <div className={`w-64 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-transform duration-300 transform sm:translate-x-0 ${show? "translate-x-0 ":"-translate-x-full"}`}>
        <div onClick={()=>setShow(!show)} className='sm:hidden absolute top-4 right-4 text-xl cursor-pointer ' > 
          <  BiLeftArrowAlt  className='text-2xl'/>
        </div>

     
       
        <div className='text-center mt-2 '>
          <img  className='w-24 h-24 rounded-full mx-auto mb-2' src={profile?.user?.photo} alt="My pic" />
          <p className='text-lg font-semibold'>{profile?.user?.username}</p>
          
        </div>
        <div>
        <ul className='space-y-6'>
          <button onClick={()=>(handleComponenet("My blogs"))}  className='w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300 '>My Blogs</button>
          <button  onClick={()=>{handleComponenet("Create Blog" )}} className='w-full px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300 '>Create Blog</button>
          {/* <button onClick={()=>(handleComponenet("My profile"))} className='w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300 '>My Profile</button> */}
          {/* <button onClick={gotoHome} className='w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition duration-300 '>Home </button> */}
          {/* <button onClick={handleLogout} className='w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300 '>Log Out </button> */}
        </ul>
        </div>
       
      
      </div>
    </>
    

  )
}

export default Navbar2

