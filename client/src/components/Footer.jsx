import React from 'react'
import {Link} from "react-router-dom"
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";

function Footer() {
  return (

    <footer className='shadow-lg shadow-gray-600
      bg-slate-200 text-sm  pb-10 mb-3 mt-5 '>

      <div >
        <div className='  m-auto flex justify-around '>
      
          <div className='mt-2'>
            <h3>Products</h3>
            <ul className='flex flex-col p-1'>
              <Link  className='hover:text-gray-700'>Flutter</Link>
              <Link className='hover:text-gray-700'>React</Link>
              <Link className='hover:text-gray-700'>Android</Link>
              <Link className='hover:text-gray-700'>iOs</Link>
            </ul>
          </div>

          <div className='mt-2'>
            <h3>Design to code</h3>
            <ul className='flex flex-col p-1' >
              <Link className='hover:text-gray-700'>figma</Link>
              <Link className='hover:text-gray-700'>Templates</Link>
            </ul>
          </div>

          
          <div className='mt-2'>
            <h3 >Company</h3>
            <ul className='flex flex-col p-1 '>
              <Link to='/about'  className='hover:text-gray-700'>About us </Link>
              <Link to='/contact' className='hover:text-gray-700'>Contact us</Link>
              <Link className='hover:text-gray-700'>Privacy policy</Link>
              
            </ul>
            
          </div>
        
        </div>
      </div>

      <div className='flex justify-center p-4 gap-4'>
        <p> &copy;All right reserved</p>
        <Link to='https://www.linkedin.com/in/sagar-rana-999a04256/' > < FaLinkedin  className='text-3xl  hover:text-gray-500 duration-300'/></Link>
        <Link><FaInstagramSquare className='text-3xl hover:text-gray-500 duration-300' /></Link>
        <Link to='https://github.com/Sagar-Rana42'> <FaGithubSquare  className='text-3xl hover:text-gray-500 duration-300'/></Link>
        
       

      </div>
    </footer>
    
    
  )
}

export default Footer