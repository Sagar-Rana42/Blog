import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function About() {
  const navigateTo = useNavigate();
  return (
    <div className='container m-auto flex flex-col h-full'>
      <h2 className='text-blue-600 text-4xl m-10 '>About us </h2>
      <div className='flex'>
        <div className=' sm:ml-11 sm:mr-11 md:ml-20 md:mr-20 ml-6 lg:ml-80 lg:mr-80 mb-32'>
          <p>
            As a full stack developer, I possess a diverse
            and comprehensive skill set that spans both front-end
            and back-end technologies. On the front end, I’m proficient
            in crafting responsive and intuitive user interfaces using HTML, CSS, and JavaScript 
            frameworks like React .

            On the back end, I’m well-versed in server-side programming with Node.js, utilizing the Express.js 
            framework to build efficient and scalable applications. 
          </p>
        </div>
        {/* <div>
          <img src="virat-kohli-967.png" alt="My photo"  className=' rounded-full'/>
        </div> */}
        
      </div>
      <div className='flex justify-center '>
        <button onClick={() => navigateTo('/contact')}  className='text-xl bg-green-600 h-12 w-36 rounded-lg  shadow-[0_0_20px_5px_rgba(0,255,81,0.5)]  hover:shadow-[0_0_20px_10px_rgba(0,255,81,0.5)] hover:text-white duration-300'>
          contact me
        </button>
      </div>
    </div>
  )
}

export default About